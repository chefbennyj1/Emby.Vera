using System;
using System.Collections.Generic;
using System.Linq;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.Session;
using MediaBrowser.Model.Entities;

using VeraHomeAutomation.Api.Vera;
using VeraHomeAutomation.Configuration;

namespace VeraHomeAutomation
{
    public class EmbyEventArgs 
    {
        private static ISessionManager SessionManager { get; set; }
        
        private static List<string> PausedSessionsIds = new List<string>();
        
        // Length of  video backdrop /or Emby intro in ticks. We need to ignore this.
        private const long IntroOrVideoBackDrop = 3000000000L;

        private static string BaseSceneUrl =>
            ":3480/data_request?id=action&serviceId=urn:micasaverde-com:serviceId:" +
            "HomeAutomationGateway1&action=RunScene&SceneNum=";

        //private static string FormatJson => "&output_format=json";
        public static void EnableEvents(ISessionManager ses)
        {

            //TODO: when the user changes the vera device choice in the configuration we need to change the VeraApi.VeraDeviceInfo
            SessionManager = ses;
            SessionManager.PlaybackStart += PlaybackStarted;
            SessionManager.PlaybackStopped += PlaybackStopped;
            SessionManager.SessionStarted += SessionHasStarted;
            SessionManager.SessionEnded += SessionHasEnded;
            SessionManager.PlaybackProgress += CurrentPlaybackProgress;
           
        }
        
        public static void PlaybackStarted(object sender, PlaybackProgressEventArgs e)
        {
            try
            {
                if (e.MediaInfo.RunTimeTicks != null &&
                    (e.Item.MediaType == MediaType.Video && e.MediaInfo.RunTimeTicks.Value < IntroOrVideoBackDrop))
                {
                    return;
                }

                string sceneName = string.Empty;
                var config = new PluginConfiguration();

                var profile = config.SavedDeviceProfiles.Find(p =>
                    p.Name.Equals(e.DeviceName) && e.ClientName.Equals(p.AppName));

                if (ScheduleAllowScene(profile, config))
                {
                    switch (e.MediaInfo.Type)
                    {
                        case "Movie":
                            sceneName = profile.MoviesPlaybackStarted;
                            break;
                        case "TvChannel":
                            sceneName = profile.LiveTvPlaybackStarted;
                            break;
                        case "Series":
                            sceneName = profile.SeriesPlaybackStarted;
                            break;
                        case "Season":
                            sceneName = profile.SeriesPlaybackStarted;
                            break;
                        case "Episode":
                            //var info = EpisodeStopEventTimers.Find(
                            //    t => t.DeviceName == e.DeviceName && t.AppName == e.ClientName);
                            //if (info != null)
                            //{
                            //    EpisodeStopEventTimers.RemoveAll(t => t.DeviceName == info.DeviceName && t.AppName == info.AppName);
                            //    break;
                            //}
                            sceneName = profile.SeriesPlaybackStarted;
                            break;
                        case "Album":
                            sceneName = profile.MusicPlaybackStarted;
                            break;
                        case "Artist":
                            sceneName = profile.MusicPlaybackStarted;
                            break;
                        case "Audio":
                            sceneName = profile.MusicPlaybackStarted;
                            break;
                        default:
                            sceneName = string.Empty;
                            break;
                    }
                }
                else
                {
                    return;
                }
                if (sceneName.Equals(string.Empty)) return;
                RunScene(sceneName, config);
            }
            catch { }
        }

        public static void PlaybackStopped(object sender, PlaybackStopEventArgs e)
        {
            try
            {
                string sceneName = string.Empty;
                var config = new PluginConfiguration();
                var profile = config.SavedDeviceProfiles.Find(p => p.Name.Equals(e.DeviceName) && e.ClientName.Equals(p.AppName));

                if (ScheduleAllowScene(profile, config))
                {
                    switch (e.MediaInfo.Type)
                    {
                        case "Movie":
                            sceneName = profile.MoviesPlaybackStopped;
                            break;
                        case "TvChannel":
                            sceneName = profile.LiveTvPlaybackStopped;
                            break;
                        case "Series":
                            sceneName = profile.SeriesPlaybackStopped;
                            break;
                        case "Season":
                            sceneName = profile.SeriesPlaybackStopped;
                            break;
                        case "Episode":

                            sceneName = profile.SeriesPlaybackStopped;
                            break;
                        case "Album":
                            sceneName = profile.MusicPlaybackStopped;
                            break;
                        case "Artist":
                            sceneName = profile.MusicPlaybackStopped;
                            break;
                        case "Audio":
                            sceneName = profile.MusicPlaybackStopped;
                            break;
                        default:
                            sceneName = string.Empty;
                            break;
                    }
                }
                else
                {
                    return;
                }

                if (sceneName.Equals(string.Empty)) return;
                RunScene(sceneName, config);
            }
            catch { }
        }

        public static void CurrentPlaybackProgress(object sender, PlaybackProgressEventArgs e)
        {
            try
            {
                var config = new PluginConfiguration();

                var session = SessionManager.Sessions.First(s => config.SavedDeviceProfiles.Any(p => s.DeviceName.Equals(p.Name)));

                switch (session.PlayState.IsPaused)
                {
                    case true:
                        PausedSessionsIds.Add(session.Id);
                        PlaybackPaused(e, config);
                        break;

                    case false:
                        if (PausedSessionsIds.Exists(s => s.Equals(session.Id)))
                        {
                            PlaybackUnPaused(e, config);
                            PausedSessionsIds.RemoveAll(s => s.Equals(session.Id));
                        }
                        break;
                }
            }
            catch { }

            
        }

        private static void PlaybackPaused(PlaybackProgressEventArgs e, PluginConfiguration config)
        {
            try
            {
                string sceneName = string.Empty;

                var profile = config.SavedDeviceProfiles.Find(p => p.Name.Equals(e.DeviceName) && e.ClientName.Equals(p.AppName));

                if (ScheduleAllowScene(profile, config))
                {
                    switch (e.MediaInfo.Type)
                    {
                        case "Movie":
                            sceneName = profile.MoviesPlaybackPaused;
                            break;
                        case "TvChannel":
                            sceneName = profile.LiveTvPlaybackPaused;
                            break;
                        case "Series":
                            sceneName = profile.SeriesPlaybackPaused;
                            break;
                        case "Season":
                            sceneName = profile.SeriesPlaybackPaused;
                            break;
                        case "Episode":
                            sceneName = profile.SeriesPlaybackPaused;
                            break;
                        case "Album":
                            sceneName = profile.MusicPlaybackPaused;
                            break;
                        case "Artist":
                            sceneName = profile.MusicPlaybackPaused;
                            break;
                        case "Audio":
                            sceneName = profile.MusicPlaybackPaused;
                            break;
                        default:
                            sceneName = string.Empty;
                            break;
                    }
                }
                else
                {
                    return;
                }

                if (sceneName.Equals(string.Empty)) return;
                RunScene(sceneName, config);
            }
            catch { }
        }

        private static void PlaybackUnPaused(PlaybackProgressEventArgs e, PluginConfiguration config)
        {
            try
            {
                string sceneName = string.Empty;
                var profile = config.SavedDeviceProfiles.Find(p => p.Name.Equals(e.DeviceName) && e.ClientName.Equals(p.AppName));

                if (ScheduleAllowScene(profile, config))
                {
                    switch (e.MediaInfo.Type)
                    {
                        case "Movie":
                            sceneName = profile.MoviesPlaybackUnPaused;
                            break;
                        case "TvChannel":
                            sceneName = profile.LiveTvPlaybackUnPaused;
                            break;
                        case "Series":
                            sceneName = profile.SeriesPlaybackUnPaused;
                            break;
                        case "Season":
                            sceneName = profile.SeriesPlaybackUnPaused;
                            break;
                        case "Episode":
                            sceneName = profile.SeriesPlaybackUnPaused;
                            break;
                        case "Album":
                            sceneName = profile.MusicPlaybackUnPaused;
                            break;
                        case "Artist":
                            sceneName = profile.MusicPlaybackUnPaused;
                            break;
                        case "Audio":
                            sceneName = profile.MusicPlaybackUnPaused;
                            break;
                        default:
                            sceneName = string.Empty;
                            break;
                    }
                }
                else
                {
                    return;
                }

                if (sceneName.Equals(string.Empty)) return;
                RunScene(sceneName, config);
            }
            catch { }
        }

        public static void SessionHasEnded(object sender, SessionEventArgs e)
        {
            try
            {
                var config = new PluginConfiguration();
                var profile = config.SavedDeviceProfiles.Find(p =>
                    p.Name.Equals(e.SessionInfo.DeviceName) && e.SessionInfo.Client.Equals(p.AppName));
                var sceneName = profile.SessionEnded;

                if (sceneName.Equals(string.Empty)) return;
                RunScene(sceneName, config);
            }
            catch
            {
            }
        }

        public static void SessionHasStarted(object sender, SessionEventArgs e)
        {
            try
            {
                var config = new PluginConfiguration();
                var profile = config.SavedDeviceProfiles.Find(p =>
                    p.Name.Equals(e.SessionInfo.DeviceName) && e.SessionInfo.Client.Equals(p.AppName));
                var sceneName = profile.SessionStarted;

                if (sceneName.Equals(string.Empty)) return;
                RunScene(sceneName, config);
            }
            catch
            {
            }
        }

        private static bool ScheduleAllowScene(SavedDevice device, PluginConfiguration config)
        {
            if (string.IsNullOrEmpty(device.SceneSchedule)) return true;            
            return (DateTime.Now.TimeOfDay >= TimeSpan.Parse(device.SceneSchedule + ":00") && DateTime.Now.TimeOfDay <= TimeSpan.Parse("4:00:00"));
        }

        private static void RunScene(string sceneName, PluginConfiguration config)
        {
            var scene = VeraApi.VeraDeviceInfo.Scenes.SingleOrDefault(s => s.name.Equals(sceneName));

            if (scene != null && !scene.id.Equals(null))
            {
                PluginHttpClient.PostStream("http://" + config.SaveVeraDeviceIp + BaseSceneUrl + scene.id);
            }
        }
    }
}

