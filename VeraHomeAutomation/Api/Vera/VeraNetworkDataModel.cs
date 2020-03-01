using System.Collections.Generic;

namespace VeraHomeAutomation.Api.Vera
{

    // ReSharper disable InconsistentNaming

    public class Section
    {
        public string name { get; set; }
        public int id { get; set; }
    }

    public class Room
    {
        public string name { get; set; }
        public int id { get; set; }
        public int section { get; set; }
    }

    public class Scene
    {
        public int active { get; set; }
        public string name { get; set; }
        public int id { get; set; }
        public int room { get; set; }
        public int? state { get; set; }
        public string comment { get; set; }
    }

    public class Device
    {
        public string name { get; set; }
        public string altid { get; set; }
        public int id { get; set; }
        public int category { get; set; }
        public int subcategory { get; set; }
        public int room { get; set; }
        public int parent { get; set; }
        public string level { get; set; }
        public string status { get; set; }
        public int state { get; set; }
        public string comment { get; set; }
        public string ip { get; set; }
    }

    public class Category
    {
        public string name { get; set; }
        public int id { get; set; }
    }

    public class VeraNetworkDataModel
    {
        public int full
        {
            get => m_Full;
            set => m_Full = value;
        }


        private static int m_Full;

        public string version
        {
            get => m_Version;
            set => m_Version = value;
        }


        private static string m_Version;

        public string model
        {
            get => m_Model;
            set => m_Model = value;
        }
        
        private static string m_Model;

        public int zwave_heal
        {
            get => m_ZwaveHeal;
            set => m_ZwaveHeal = value;
        }
        
        private static int m_ZwaveHeal;

        public string temperature
        {
            get => m_Temperature;
            set => m_Temperature = value;
        }
        
        private static string m_Temperature;

        public string skin
        {
            get => m_Skin;
            set => m_Skin = value;
        }


        private static string m_Skin;

        public string serial_number
        {
            get => m_SerialNumber;
            set => m_SerialNumber = value;
        }


        private static string m_SerialNumber;

        public string fwd1
        {
            get => m_Fwd1;
            set => m_Fwd1 = value;
        }


        private static string m_Fwd1;

        public string fwd2
        {
            get => m_Fwd2;
            set => m_Fwd2 = value;
        }


        private static string m_Fwd2;

        public int mode
        {
            get => m_Mode;
            set => m_Mode = value;
        }
        
        private static int m_Mode;

        public List<Section> sections
        {
            get => m_Sections;
            set => m_Sections = value;
        }
        
        private static List<Section> m_Sections;

        public List<Room> rooms
        {
            get => m_Rooms;
            set => m_Rooms = value;
        }
        
        private static List<Room> m_Rooms;

        public List<Scene> scenes
        {
            get => m_Scenes;
            set => m_Scenes = value;
        }
        
        private static List<Scene> m_Scenes;

        public List<Device> devices
        {
            get => m_Devices;
            set => m_Devices = value;
        }
        
        private static List<Device> m_Devices;

        public List<Category> categories
        {
            get => m_Categories;
            set => m_Categories = value;
        }
        
        private static List<Category> m_Categories;

        public int ir
        {
            get => m_Ir;
            set => m_Ir = value;
        }
        
        private static int m_Ir;

        public string irtx
        {
            get => m_Irtx;
            set => m_Irtx = value;
        }
        
        private static string m_Irtx;

        public int loadtime
        {
            get => m_Loadtime;
            set => m_Loadtime = value;
        }
        
        private static int m_Loadtime;

        public int dataversion
        {
            get => m_Dataversion;
            set => m_Dataversion = value;
        }
        
        private static int m_Dataversion;

        public int state
        {
            get => m_State;
            set => m_State = value;
        }
        
        private static int m_State;

        public string comment
        {
            get => m_Comment;
            set => m_Comment = value;
        }

        private static string m_Comment;
    }

}