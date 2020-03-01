using System.Collections.Generic;
using MediaBrowser.Model.Plugins;

namespace VeraHomeAutomation.Configuration
{
    
    public class PluginConfiguration : BasePluginConfiguration
    {
        
        public Location Location
        {
            get => MLocation;
            set => MLocation = value;
        }
        private static Location MLocation       { get; set; }

        public bool UserVeraIpOverride
        {
            get => MUserVeraIpOverride;
            set => MUserVeraIpOverride = value;
        }
        private static bool MUserVeraIpOverride;

        public string SaveVeraDeviceIp
        {
            get => MSaveVeraDeviceIp;
            set => MSaveVeraDeviceIp = value;
        }
        private static string MSaveVeraDeviceIp { get; set; }

        public Device DeviceConfiguration
        {
            get => MDeviceConfiguration;
            set => MDeviceConfiguration = value;
        }
        private static Device MDeviceConfiguration = new Device();

        public List<SavedDevice> SavedDeviceProfiles
        {
            get => MSavedDeviceProfiles;
            set => MSavedDeviceProfiles = value;
        }
        private static List<SavedDevice> MSavedDeviceProfiles = new List<SavedDevice>();
       
    }

    public class Location
    {
        public string Name                      { get; set; }
        public double Latitude                  { get; set; }
        public double Longitude                 { get; set; }
    }

    public class Device
    {
        public string Name                      { get; set; }
        public string AppName                   { get; set; }
        public string Id                        { get; set; }
    }

    public class SavedDevice
    {
        public string Name                      { get; set; }

        public string Id                        { get; set; }

        public string AppName                   { get; set; }

        //Movies
        public string MoviesPlaybackStarted     { get; set; }

        public string MoviesPlaybackStopped     { get; set; }

        public string MoviesPlaybackPaused      { get; set; }

        public string MoviesPlaybackUnPaused    { get; set; }

        //TV
        public string SeriesPlaybackStarted     { get; set; }

        public string SeriesPlaybackStopped     { get; set; }

        public string SeriesPlaybackPaused      { get; set; }

        public string SeriesPlaybackUnPaused    { get; set; }

        //Live TV
        public string LiveTvPlaybackStarted { get; set; }

        public string LiveTvPlaybackStopped { get; set; }

        public string LiveTvPlaybackPaused { get; set; }

        public string LiveTvPlaybackUnPaused { get; set; }

        //Music
        public string MusicPlaybackStarted      { get; set; }

        public string MusicPlaybackStopped      { get; set; }

        public string MusicPlaybackPaused       { get; set; }

        public string MusicPlaybackUnPaused     { get; set; }

        //Session
        public string SessionStarted            { get; set; }

        public string SessionEnded              { get; set; }
        
        //Schedule
        public string SceneSchedule             { get; set; }

        public bool EnableSmartSchedule         { get; set; }
        
    }

    
}