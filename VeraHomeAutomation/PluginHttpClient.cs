using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediaBrowser.Common.Net;

namespace VeraHomeAutomation
{

    public class PluginHttpClient
    {

        private static readonly IHttpClient HttpClient = VeraHomeAutomationServerEntryPoint.HttpClient;

        public static async Task<string> GetStream(string url)
        {
            try
            {
                using (
                    var stream = await HttpClient.Get(
                        new HttpRequestOptions
                        {
                            Url = url,
                            CancellationToken = CancellationToken.None
                        })
                        .ConfigureAwait(false))
                {
                    using (var sr = new StreamReader(stream))
                    {
                        return sr.ReadToEnd();
                    }
                }   
            }
             
            catch { }
            return string.Empty;
        }

        public static async void PostStream(string url)
        {
            try
            {
                using (await HttpClient.Post(
                        new HttpRequestOptions
                        {
                            Url = url,
                            CancellationToken = CancellationToken.None,
                            EnableHttpCompression = false,
                        })
                    .ConfigureAwait(false))
                {
                }
            }
           
            catch { }
        }

    }
}