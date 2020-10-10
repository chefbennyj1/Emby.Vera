using System;
using MediaBrowser.Common.Net;
using MediaBrowser.Controller.Plugins;
using MediaBrowser.Controller.Session;
using MediaBrowser.Model.Serialization;
using VeraHomeAutomation.Configuration;
using MediaBrowser.Controller.Devices;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.TV;
using VeraHomeAutomation.Api.Vera;

namespace VeraHomeAutomation
{

    public class VeraHomeAutomationServerEntryPoint : IServerEntryPoint
    {
        private static ISessionManager SessionManager   { get; set; }

        public static IJsonSerializer JSonSerializer    { get; private set; }

        private static IServerEntryPoint Instance       { get; set; }

        public static IHttpClient HttpClient            { get; private set; }

        private static IUserManager UserManager         { get; set; }

        private static IDeviceManager DeviceManager     { get; set; }
        
        private static ITVSeriesManager TvSeriesManager { get; set; }

        

        public VeraHomeAutomationServerEntryPoint(IDeviceManager dM, ISessionManager sM, IJsonSerializer jSon, IHttpClient http, ITVSeriesManager tvMan, IUserManager userMan)
        {
            Instance        = this;
            SessionManager  = sM;
            JSonSerializer  = jSon;
            HttpClient      = http;
            DeviceManager   = dM;
            TvSeriesManager = tvMan;
            UserManager     = userMan;
            
            Plugin.Instance.UpdateConfiguration(Plugin.Instance.Configuration);

            Setup();
        }

        private static async void Setup()
        {
            var config             = new PluginConfiguration();
            var ip                 = config.SaveVeraDeviceIp ?? await VeraApi.GetFirstOrDefaultVeraDeviceIp();

            if (ip.Equals("error")) return;

            VeraApi.VeraDeviceInfo = await VeraApi.GetVeraDeviceInfoAsync(ip);
            
            config.SaveVeraDeviceIp = VeraApi.VeraDeviceInfo.InternalIp;

            Plugin.Instance.UpdateConfiguration(config);

            EmbyEventArgs.EnableEvents(SessionManager);
        }


        private static void Dispose()
        {
            SessionManager.PlaybackStart    -= EmbyEventArgs.PlaybackStarted;
            SessionManager.PlaybackStopped  -= EmbyEventArgs.PlaybackStopped;
            SessionManager.SessionStarted   -= EmbyEventArgs.SessionHasStarted;
            SessionManager.SessionEnded     -= EmbyEventArgs.SessionHasEnded;
            SessionManager.PlaybackProgress -= EmbyEventArgs.CurrentPlaybackProgress;
        }

        private void IServerEntryPoint_Run()
        {
           // Log.Info("Home Automation Loaded");
        }

        void IServerEntryPoint.Run()
        {
            IServerEntryPoint_Run();
        }

        public void IDisposable_Dispose()
        {
            Dispose();
        }

        void IDisposable.Dispose()
        {
            IDisposable_Dispose();
        }

        
    }
}

//=======================================================
//Code written by Benjamin Anderson
//chefbennyj@gmail.com
//=======================================================

