using System;
using MediaBrowser.Controller.Devices;
using MediaBrowser.Model.Devices;
using MediaBrowser.Model.Serialization;
using MediaBrowser.Model.Services;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using MediaBrowser.Controller.LiveTv;
using MediaBrowser.Controller.Net;
using MediaBrowser.Model.LiveTv;

using VeraHomeAutomation.Api.Vera;
using VeraHomeAutomation.Configuration;

namespace VeraHomeAutomation
{
  
    [Authenticated(Roles = "Admin")]
    [Route("/VeraDeviceList", "GET", Summary = "List of network Vera Device Ips")]
    public class VeraDeviceList : IReturn<string>
    {
        private List<VeraDevice> Devices { get; set; }
    }

    [Authenticated(Roles = "Admin")]
    [Route("/VeraSceneList", "GET", Summary = "Vera Scene List End Point for controlling device")]
    public class VeraScenes : IReturn<string>
    {
        public string Scenes { get; set; }
    }

    [Authenticated(Roles = "Admin")]
    [Route("/VeraModelInfo", "GET", Summary = "Vera Device Info End Point for controlling device")]
    public class VeraDeviceInfo : IReturn<string>
    {
        public string InternalIp { get; set; }
        public List<Scene> Scenes { get; set; }
        public string Type { get; set; }
        public string SerialNumber { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
    }

    [Route("/VeraAlive", "GET", Summary ="Vera Loading")]
    public class VeraAlive : IReturn<string>
    {
        public string Alive { get; set; }
    }

    [Route("/GetName", "GET", Summary = "Calculate the Vera Device Name")]
    public class GetName : IReturn<string>
    {
        [ApiMember(Name = "IpAddress", Description = "Ip Address of the Vera Device", IsRequired = true, DataType = "string", ParameterType = "query", Verb = "GET")]
        public string IpAddress { get; set; }
        public string Name { get; set; }
    }

    [Route("/LiveTvTunerName", "GET", Summary = "Live Tv Tuner Info for events")]
    public class TunerInfo
    {
        public string Name { get; set; }
    }

    public class VeraHomeAutomationService :  IService, IRequiresRequest
    {
        private IDeviceManager DeviceManager { get; set; }
        private IJsonSerializer JsonSerializer { get; set; }
        private ILiveTvManager TvManager { get; set; }
        public IRequest Request { get; set; }

        public VeraHomeAutomationService(IDeviceManager dM, IJsonSerializer jS, ILiveTvManager man)
        {
            DeviceManager = dM;
            JsonSerializer = jS;
            TvManager = man;
           
        }

        

        public string Get(TunerInfo request)
        {
            List<TunerHostInfo> tunerInfo = null;
            try
            {
                tunerInfo = TvManager.DiscoverTuners(false, CancellationToken.None).Result;
            }
            catch { }

            return JsonSerializer.SerializeToString(new TunerInfo
            {
                Name = tunerInfo != null ? tunerInfo.FirstOrDefault()?.FriendlyName : string.Empty,

            });
        }

        public string Get(VeraDeviceInfo request)
        {
            var config  = new PluginConfiguration();
            
            return JsonSerializer.SerializeToString(VeraApi.GetVeraDeviceInfoAsync(config.SaveVeraDeviceIp).Result);
        }              
       

        public string Get(VeraDeviceList request)
        {
            return JsonSerializer.SerializeToString(VeraApi.GetVeraDevices().Result);
        } 

        public string Get(VeraScenes request)
        {
            var networkData =  VeraApi.GetNetworkDataAsync(VeraApi.VeraDeviceInfo.InternalIp).Result;
            return JsonSerializer.SerializeToString(networkData.scenes);
        }

        public string Get(VeraAlive request)
        {
            try
            {
                
                return JsonSerializer.SerializeToString(VeraApi.DeviceReadyAsync(VeraApi.VeraDeviceInfo.InternalIp).Result) ;
            }
            catch
            {
                return "false";
            }
        }

        public string Get(GetName request)
        {
            var networkData = VeraApi.GetNetworkDataAsync(request.IpAddress).Result;
            return JsonSerializer.SerializeToString(new GetName
            {
                Name = VeraApi.GetVeraName(networkData.model)

            });
        }

      

    }
}
