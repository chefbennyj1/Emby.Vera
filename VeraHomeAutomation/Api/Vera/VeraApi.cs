using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediaBrowser.Model.Serialization;

namespace VeraHomeAutomation.Api.Vera
{
    public class VeraApi
    {
        private static readonly IJsonSerializer JSonSerializer = VeraHomeAutomationServerEntryPoint.JSonSerializer;
        
        public static VeraDeviceInfo VeraDeviceInfo { get; set; }

        private const string BaseLocatorUrl = @"https://vera-us-oem-authd.mios.com/locator/locator/locator";
        
        public static async Task<bool> DeviceReadyAsync(string ipAddress)
        {
            return await PluginHttpClient.GetStream(@"http://" + ipAddress + ":3480/data_request?id=alive") == ("OK");
        }
        
        private static async Task<VeraNetworkDeviceModel> LocateVeraDeviceAsync()
        {
            var jSon = string.Empty;
            try
            {
                jSon =
                    await PluginHttpClient.GetStream(BaseLocatorUrl);
            }
            catch { }
            return JSonSerializer.DeserializeFromString<VeraNetworkDeviceModel>(jSon);

        }

        public static async Task<VeraNetworkDataModel> GetNetworkDataAsync(string ip)
        {
            try
            {
                return JSonSerializer.DeserializeFromString<VeraNetworkDataModel>(await PluginHttpClient.GetStream("http://" + ip + ":3480/data_request?id=sdata"));
            }
            catch { return null; }
        }

        public static async Task<List<VeraDevice>> GetVeraDevices()
        {
            try
            {
                var json =
                    await PluginHttpClient.GetStream(BaseLocatorUrl);

                if (json.Equals(string.Empty)) return null;

                VeraNetworkDeviceModel deviceInfoUi7 = await LocateVeraDeviceAsync();
                return deviceInfoUi7.Devices;

            }
            catch
            {

            }

            return null;
        }

        public static async Task<string> GetFirstOrDefaultVeraDeviceIp()
        {

            try
            {

                VeraNetworkDeviceModel deviceInfoUi7 = await LocateVeraDeviceAsync();
                VeraDevice veraDeviceUi7 = deviceInfoUi7.Devices.FirstOrDefault();
                if (veraDeviceUi7 != null)
                    return veraDeviceUi7.InternalIP;
            }
            catch
            {
                return "error";
            }
            return "error";
        }

        private static string GetVeraImageUrl(string model)
        {
            switch (model)
            {
                case "VeraLite":
                    {
                        return "https://home.getvera.com/assets/portal_getvera_ui7/images/veralite_front.jpg";
                    }

                case "VeraEdge":
                    {
                        return "https://home.getvera.com/assets/portal_getvera_ui7/images/veraedge_front.jpg";
                    }

                case "VeraLite G":
                    {
                        return "https://home.getvera.com/assets/portal_getvera_ui7/images/veraliteg_front.jpg";
                    }

                default:
                    return "http://getvera.com/wp-content/uploads/VeraPlus_Controller_TOP_LEDs-640x640.jpg";
            }
        }

        public static string GetVeraName(string model)
        {

            if (model.Contains("G450"))
            {
                return "Vera Plus";
            }

            if (model.Contains("NA900"))
            {
                return "Vera 3";
            }

            if (model.Contains("NA301"))
            {
                return "Vera Edge";
            }

            if (model.Contains("G550"))
            {
                return "Vera Plus";
            }
            return "Vera Edge";

        }

        public static async Task<VeraDeviceInfo> GetVeraDeviceInfoAsync(string ipAddress = null)
        {
            var ip = ipAddress ?? await GetFirstOrDefaultVeraDeviceIp();

            var networkData = await GetNetworkDataAsync(ip);
            
            VeraDeviceInfo =  new VeraDeviceInfo()
            {
                InternalIp = ip,
                Scenes = networkData.scenes,
                Type = networkData.model,
                SerialNumber = networkData.serial_number,
                ImageUrl = GetVeraImageUrl(networkData.model),
                Name = GetVeraName(networkData.model)
            };
            return VeraDeviceInfo;
        }

    }


}
