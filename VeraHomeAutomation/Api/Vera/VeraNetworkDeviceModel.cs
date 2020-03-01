using System.Collections.Generic;

namespace VeraHomeAutomation.Api.Vera
{
    // ReSharper disable InconsistentNaming
    
    public class VeraDevice
    {
        public int PK_Device { get; set; }
        public string MacAddress { get; set; }
        public int PK_DeviceType { get; set; }
        public int PK_DeviceSubType { get; set; }
        public string Server_Device { get; set; }
        public string Server_Event { get; set; }
        public int PK_Account { get; set; }
        public string Server_Account { get; set; }
        public string InternalIP { get; set; }
        public string LastAliveReported { get; set; }
        public string Platform { get; set; }
        
    }

    public class VeraNetworkDeviceModel
    {
        public List<VeraDevice> Devices { get; set; }
    }
}
   