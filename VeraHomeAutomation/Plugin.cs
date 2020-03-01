using System;
using System.IO;
using System.Collections.Generic;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;
using MediaBrowser.Model.Drawing;
using VeraHomeAutomation.Configuration;

namespace VeraHomeAutomation
{
    public class Plugin : BasePlugin<PluginConfiguration>, IHasWebPages, IHasThumbImage
    {
        public Plugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer)
            : base(applicationPaths, xmlSerializer)
        {
            Instance = this;
        }

        public static Plugin Instance { get; private set; }
        

        public override Guid Id => new Guid("df04d306-8cbb-49d5-9107-20581aacf86f");

        public Stream GetThumbImage()
        {
            var type = GetType();
            return type.Assembly.GetManifestResourceStream(type.Namespace + ".thumb.png");
        }

        public ImageFormat ThumbImageFormat => ImageFormat.Png;

        public override string Name => "Vera Zwave Controller";

        public IEnumerable<PluginPageInfo> GetPages()
        {
            return new[]
            {
                new PluginPageInfo
                {
                    Name = "MainPluginConfigurationPage",
                    EmbeddedResourcePath = GetType().Namespace + ".Configuration.MainPluginConfigurationPage.html",
                    EnableInMainMenu = true,
                    DisplayName = "Home Automation"
                },
                 new PluginPageInfo()
                {
                    Name = "MainPluginConfigurationPageJS",
                    EmbeddedResourcePath = GetType().Namespace + ".Configuration.mainPluginConfigurationPage.js",
                }
            };
        }
    }
}

