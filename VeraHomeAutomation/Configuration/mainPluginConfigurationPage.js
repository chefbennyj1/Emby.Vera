
define(["loading", "dialogHelper", "emby-select", "emby-input"],
    function (loading, dialogHelper) {

        var pluginId = "df04d306-8cbb-49d5-9107-20581aacf86f";
        
        function svgIcon(device, appName) {
          
             if (device.toLowerCase().indexOf("xbox") > -1)
                 return "M6.43,3.72C6.5,3.66 6.57,3.6 6.62,3.56C8.18,2.55 10,2 12,2C13.88,2 15.64,2.5 17.14,3.42C17.25,3.5 17.54,3.69 17.7,3.88C16.25,2.28 12,5.7 12,5.7C10.5,4.57 9.17,3.8 8.16,3.5C7.31,3.29 6.73,3.5 6.46,3.7M19.34,5.21C19.29,5.16 19.24,5.11 19.2,5.06C18.84,4.66 18.38,4.56 18,4.59C17.61,4.71 15.9,5.32 13.8,7.31C13.8,7.31 16.17,9.61 17.62,11.96C19.07,14.31 19.93,16.16 19.4,18.73C21,16.95 22,14.59 22,12C22,9.38 21,7 19.34,5.21M15.73,12.96C15.08,12.24 14.13,11.21 12.86,9.95C12.59,9.68 12.3,9.4 12,9.1C12,9.1 11.53,9.56 10.93,10.17C10.16,10.94 9.17,11.95 8.61,12.54C7.63,13.59 4.81,16.89 4.65,18.74C4.65,18.74 4,17.28 5.4,13.89C6.3,11.68 9,8.36 10.15,7.28C10.15,7.28 9.12,6.14 7.82,5.35L7.77,5.32C7.14,4.95 6.46,4.66 5.8,4.62C5.13,4.67 4.71,5.16 4.71,5.16C3.03,6.95 2,9.35 2,12A10,10 0 0,0 12,22C14.93,22 17.57,20.74 19.4,18.73C19.4,18.73 19.19,17.4 17.84,15.5C17.53,15.07 16.37,13.69 15.73,12.96Z";

             if (device.toLowerCase().indexOf("roku") > -1)
                 return "M4,5V11H21V5M4,18H21V12H4V18Z"; 

            if (appName.toLowerCase().indexOf("android") > -1)
                return "M15,9A1,1 0 0,1 14,8A1,1 0 0,1 15,7A1,1 0 0,1 16,8A1,1 0 0,1 15,9M9,9A1,1 0 0,1 8,8A1,1 0 0,1 9,7A1,1 0 0,1 10,8A1,1 0 0,1 9,9M16.12,4.37L18.22,2.27L17.4,1.44L15.09,3.75C14.16,3.28 13.11,3 12,3C10.88,3 9.84,3.28 8.91,3.75L6.6,1.44L5.78,2.27L7.88,4.37C6.14,5.64 5,7.68 5,10V11H19V10C19,7.68 17.86,5.64 16.12,4.37M5,16C5,19.86 8.13,23 12,23A7,7 0 0,0 19,16V12H5V16Z";
                            

            if (device.toLowerCase().indexOf("amazon") > -1)
                return "M15.93,17.09C15.75,17.25 15.5,17.26 15.3,17.15C14.41,16.41 14.25,16.07 13.76,15.36C12.29,16.86 11.25,17.31 9.34,17.31C7.09,17.31 5.33,15.92 5.33,13.14C5.33,10.96 6.5,9.5 8.19,8.76C9.65,8.12 11.68,8 13.23,7.83V7.5C13.23,6.84 13.28,6.09 12.9,5.54C12.58,5.05 11.95,4.84 11.4,4.84C10.38,4.84 9.47,5.37 9.25,6.45C9.2,6.69 9,6.93 8.78,6.94L6.18,6.66C5.96,6.61 5.72,6.44 5.78,6.1C6.38,2.95 9.23,2 11.78,2C13.08,2 14.78,2.35 15.81,3.33C17.11,4.55 17,6.18 17,7.95V12.12C17,13.37 17.5,13.93 18,14.6C18.17,14.85 18.21,15.14 18,15.31L15.94,17.09H15.93M13.23,10.56V10C11.29,10 9.24,10.39 9.24,12.67C9.24,13.83 9.85,14.62 10.87,14.62C11.63,14.62 12.3,14.15 12.73,13.4C13.25,12.47 13.23,11.6 13.23,10.56M20.16,19.54C18,21.14 14.82,22 12.1,22C8.29,22 4.85,20.59 2.25,18.24C2.05,18.06 2.23,17.81 2.5,17.95C5.28,19.58 8.75,20.56 12.33,20.56C14.74,20.56 17.4,20.06 19.84,19.03C20.21,18.87 20.5,19.27 20.16,19.54M21.07,18.5C20.79,18.14 19.22,18.33 18.5,18.42C18.31,18.44 18.28,18.26 18.47,18.12C19.71,17.24 21.76,17.5 22,17.79C22.24,18.09 21.93,20.14 20.76,21.11C20.58,21.27 20.41,21.18 20.5,21C20.76,20.33 21.35,18.86 21.07,18.5Z";

            if (device.toLowerCase().indexOf("apple") > -1)
                return "M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z";

            if (appName.toLowerCase().indexOf("windows") > -1 ||
                device.toLowerCase().indexOf("windows") > -1)
                return "M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z";

            if (appName.toLowerCase().indexOf("dlna") > -1 ||
                device.toLowerCase().indexOf("dlna") > -1)
                return "M21.38,12.56H12.85C11.97,12.56 11.1,12.96 10.61,13.61V13.6C10.12,14.28 9.32,14.72 8.41,14.72C6.92,14.72 5.71,13.5 5.71,12C5.71,10.5 6.92,9.31 8.41,9.31C9.32,9.31 10.12,9.75 10.61,10.43V10.42C11.1,11.07 11.97,11.5 12.85,11.5H21.29C21.45,11.5 22,11.4 22,10.67C21.26,6.43 17.1,3.18 12.06,3.18C8.96,3.18 6.19,4.41 4.34,6.35C4.05,6.79 4.35,6.92 4.63,6.96H10.14C11,6.96 11.89,6.54 12.38,5.89V5.91C12.88,5.23 13.67,4.78 14.58,4.78C16.07,4.78 17.28,6 17.28,7.5C17.28,9 16.07,10.2 14.58,10.2C13.67,10.2 12.88,9.75 12.38,9.07V9.08C11.89,8.44 11,8.03 10.14,8.03H4.13L4.15,8.03C4.15,8.03 3.26,8 2.72,8.75C2.3,9.42 2,10.85 2,12C2,13.16 2.17,14.21 2.72,15.27C3.19,16.03 4.15,16 4.15,16H4.11L10.14,16C11,16 11.89,15.58 12.38,14.93V14.94C12.88,14.26 13.67,13.81 14.58,13.81C16.07,13.81 17.28,15.03 17.28,16.5C17.28,18 16.07,19.23 14.58,19.23C13.67,19.23 12.88,18.78 12.38,18.1V18.12C11.89,17.47 11,17.05 10.14,17.05H4.64C4.36,17.09 4.06,17.22 4.32,17.64C6.17,19.58 8.95,20.82 12.06,20.82C17.11,20.82 21.28,17.57 22,13.31C22,12.72 21.59,12.58 21.38,12.56";

            if (appName.toLowerCase().indexOf("chromecast") > -1 ||
                device.toLowerCase().indexOf("chromecast") > -1)
                return "M12,20L15.46,14H15.45C15.79,13.4 16,12.73 16,12C16,10.8 15.46,9.73 14.62,9H19.41C19.79,9.93 20,10.94 20,12A8,8 0 0,1 12,20M4,12C4,10.54 4.39,9.18 5.07,8L8.54,14H8.55C9.24,15.19 10.5,16 12,16C12.45,16 12.88,15.91 13.29,15.77L10.89,19.91C7,19.37 4,16.04 4,12M15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12M12,4C14.96,4 17.54,5.61 18.92,8H12C10.06,8 8.45,9.38 8.08,11.21L5.7,7.08C7.16,5.21 9.44,4 12,4M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
            
            return "M11,2L6,7L7,8L2,13L7,18L8,17L13,22L18,17L17,16L22,11L17,6L16,7L11,2M10,8.5L16,12L10,15.5V8.5Z";
        }

        function getProfileTableHtml(device, svg) {
            var html = ''; 
            html += '<tr class="detailTableBodyRow detailTableBodyRow-shaded" data-name="' + device.Name + '" data-id="' + device.Id + '" data-app="' + device.AppName + '">';
            html += '<td data-title="Icon" class="detailTableBodyCell fileCell"><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.3)" d="' + svg + '"></path></svg></td>';
            html += '<td data-title="Edit" class="detailTableBodyCell fileCell"><button class="clientProfile emby-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.3)" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path></svg></button></td>';
            html += '<td data-title="Name" class="detailTableBodyCell fileCell-shaded">' + device.Name + '</td>';
            html += '<td data-title="App" class="detailTableBodyCell fileCell-shaded">' + device.AppName + '</td>';
            html += '<td class="detailTableBodyCell fileCell">';
            html += '<button class="fab btnDeleteProfile emby-button"><i class="md-icon">clear</i></button></td>';
            html += '<td class="detailTableBodyCell" style="whitespace:no-wrap;"></td>';
            html += '</tr>';

            return html; 
        }
         
        function loadPageData(view, config) {

            ApiClient.getJSON(ApiClient.getUrl("VeraModelInfo")).then(
                (modelInfo) => {
                    view.querySelector('#dashboardLink').href = "http://" + modelInfo.InternalIp; 
                });
        
            var table = view.querySelector('.clientProfiles');
            table.innerHTML = "";

            config.SavedDeviceProfiles.forEach((profile) => {

                table.innerHTML += getProfileTableHtml(profile, svgIcon(profile.Name, profile.AppName));
                view.querySelectorAll('.clientProfile').forEach(profileButton => {
                    profileButton.addEventListener('click',
                        (e) => {
                            e.preventDefault();
                            Dashboard.showLoadingMsg();
                            var ele = e.target.closest('tr');
                            var profileId = ele.dataset.id;
                            var profileName = ele.dataset.name;
                            var profileApp = ele.dataset.app;
                            openDialog(profileName, profileApp, profileId, view);
                        });
                });

                var delButtons = view.querySelectorAll('.btnDeleteProfile');
                delButtons.forEach((button) => {
                    button.addEventListener('click',
                        (e) => {
                            removeClientProfile(e, view);
                        });
                });

            });  

            var veraDeviceIps = view.querySelector('#veraDeviceIps');
            if (veraDeviceIps.length > 0) {
                removeOptionsFromSelect(veraDeviceIps);
            }

            ApiClient.getJSON(ApiClient.getUrl("VeraDeviceList")).then(
                (veraDevices) => {
                    veraDevices.forEach(
                        (device) => {
                            ApiClient.getJSON(ApiClient.getUrl("GetName?IpAddress=" + device.InternalIP)).then(
                                (result) => {
                                    veraDeviceIps.innerHTML += ('<option value="' +
                                        device.InternalIP +
                                        '">' +
                                        device.InternalIP +
                                        ' - ' +
                                        result.Name +
                                        '</option>');
                                });
                        });

                });

            if (config.SaveVeraDeviceIp) {
                veraDeviceIps.value = config.SaveVeraDeviceIp;
            } 

            var deviceNameSelect = view.querySelector('#deviceName');
            if (deviceNameSelect.length > 0) {
                removeOptionsFromSelect('#deviceName');
            }

            ApiClient.getJSON(ApiClient.getUrl("Devices")).then(
                (devices) => {
                    devices.Items.forEach(
                        (device) => {
                            deviceNameSelect.innerHTML += ('<option value="' + device.Name + '" data-id="' + device.Id + '" data-app="' + device.AppName + '" data-name="' + device.Name + '">' + device.Name + ' - ' + device.AppName + '</option>');
                        });
                }); 
        }

        function removeClientProfile(e, view) {
            var name = e.target.closest('tr').dataset.name;
            var appName = e.target.closest('tr').dataset.app;

            ApiClient.getPluginConfiguration(pluginId).then((config) => {
                var profiles = config.SavedDeviceProfiles.filter(p => p.Name !== name && p.AppName !== appName);
                config.SavedDeviceProfiles = profiles;
                ApiClient.updatePluginConfiguration(pluginId, config).then(
                    (result) => {
                        var table = view.querySelector('.clientProfiles');
                        table.innerHTML = "";
                        config.SavedDeviceProfiles.forEach((profile) => {
                            table.innerHTML += getProfileTableHtml(profile, svgIcon(profile.Name, profile.AppName));

                            view.querySelectorAll('.clientProfile').forEach(profileButton => {
                                profileButton.addEventListener('click',
                                    (e) => {
                                        e.preventDefault();

                                        Dashboard.showLoadingMsg();

                                        var ele = e.target.closest('tr');
                                        var profileId = ele.dataset.id;
                                        var profileName = ele.dataset.name;
                                        var profileApp = ele.dataset.app;
                                        openDialog(profileName, profileApp, profileId, view);
                                    });
                            });

                            var delButtons = view.querySelectorAll('.btnDeleteProfile');
                            delButtons.forEach((button) => {
                                button.addEventListener('click',
                                    (e) => {
                                        removeClientProfile(e, view);
                                    });
                            });
                        });
                    });
            });
        }

        function removeOptionsFromSelect(selectbox) {
            if (selectbox.options.length > 0) {
                for (var i = selectbox.options.length - 1; i >= 0; i--) {
                    selectbox.remove(i);
                }
            }
        }

        function loadConfig(view) {
            ApiClient.getPluginConfiguration(pluginId).then(
                (config) => {
                    loadPageData(view, config);
                    Dashboard.hideLoadingMsg;
                });
        }

        function openDialog(profileName, profileApp, profileId, view) {

            var dlg = dialogHelper.createDialog({
                size: "medium-tall",
                removeOnClose: !1,
                scrollY: !0
            });

            dlg.classList.add("formDialog");
            dlg.classList.add("ui-body-a");
            dlg.classList.add("background-theme-a");
            dlg.style.maxHeight = "85%";
            dlg.style.maxWidth = "40%";

            var html = '';

            html += '<div class="formDialogHeader" style="display:flex">';
            html += '<button is="paper-icon-button-light" class="btnCloseDialog autoSize paper-icon-button-light" tabindex="-1"><i class="md-icon"></i></button><h3 class="formDialogHeaderTitle">Authorize  ' + profileApp + ' on ' + profileName + ' to trigger Vera Scenes</h3>';
            html += '</div>';

            html += '<div class="formDialogContent">';
            html += '<div id="ClientSetup" class="dialogContentInner" style="flex-grow:1;">';
              

            html += '<div id="mediaTypeMenuContainer">';
            html += '<div id="mediaTypeMenu" style="padding-left: 6%; display: inline-flex; align-items: center; width: 100%; height: 10vh;">';

            html += '<div class="buttonContainer" style="margin: auto; width: 50%;">';
            html += '<button title="Movies" id="showMovieList" is="emby-button" class="fab emby-input-iconbutton paper-icon-button-light emby-button">';
            html += '<i class="md-icon">local_movies</i>';
            html += '</button>';
            html += '</div>';

            html += '<div class="buttonContainer" style="margin: auto; width: 50%;">';
            html += '<button title="Music" id="showMusicList" is="emby-button" class="fab emby-input-iconbutton paper-icon-button-light emby-button">';
            html += ' <i class="md-icon">headset</i>';
            html += '</button>';
            html += '</div>';

            html += ' <div class="buttonContainer" style="margin: auto; width: 50%;">';
            html += '<button title="TV Series" id="showTvList" is="emby-button" class="fab emby-input-iconbutton paper-icon-button-light emby-button">';
            html += '<i class="md-icon">tv</i>';
            html += '</button>';
            html += '</div>';

            html += '<div class="buttonContainer" style="margin: auto; width: 50%;">';
            html += '<button title="Sessions" id="showSessionList" is="emby-button" class="fab emby-input-iconbutton paper-icon-button-light emby-button">';
            html += '<i class="md-icon">how_to_reg</i>';
            html += '</button>';
            html += '</div>';

            html += '<div class="buttonContainer" style="margin: auto; width: 50%;">';
            html += '<button title="Live TV" id="showLiveTvList" is="emby-button" class="fab emby-input-iconbutton paper-icon-button-light emby-button">';
            html += '<i class="md-icon">live_tv</i>';
            html += '</div>';

            html += '<div class="buttonContainer" style="margin: auto; width: 50%;">';
            html += '<button title="Schedule" id="showSchedule" is="emby-button" class="fab emby-input-iconbutton paper-icon-button-light emby-button">';
            html += '<i class="md-icon">schedule</i>';
            html += '</button>';
            html += '</div>';

            html += '</div>';

            html += '<div class="fieldDescription" style="padding-top: 2%; padding-left: 1%;">Each media type may run specific scenes.</div >';

            html += '</div>';


            html += '<div id="musicSceneList" class="scrollY" style="margin: 2em;overflow-y: auto; display: none">';

            html += '<h1 style="margin: 0">';
            html += '<i style="padding-bottom:1%" class="md-icon">headset</i> Music</h1>';
            html += '<br />';

            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStarted">Playback Started Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStarted" id="MusicPlaybackStarted"></select>';
            html += '</div>';

            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStopped">Playback Stopped Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStopped" id="MusicPlaybackStopped"></select>';
            html += '</div>';

            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackPaused">Playback Paused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackPaused" id="MusicPlaybackPaused"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackUnpaused">Playback Unpaused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackUnpaused" id="MusicPlaybackUnPaused"></select>';
            html += '</div>';

            html += '</div>';


            html += '<div id="movieSceneList" class="scrollY" style="margin: 2em;overflow-y: auto;">';
            html += '<h1 style="margin: 0"> <i style="padding-bottom:1%" class="md-icon">movies</i> Movies</h1>';
            html += '<br />';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStarted"> Playback Started Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStarted" id="MoviesPlaybackStarted"></select>';
            html += '</div>';



            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStopped">Playback Stopped Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStopped" id="MoviesPlaybackStopped"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackPaused"> Playback Paused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackPaused" id="MoviesPlaybackPaused"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackUnpaused">Playback Unpaused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackUnpaused" id="MoviesPlaybackUnPaused"></select>';
            html += '</div>';

            html += '</div>';


            html += '<div id="liveTvSceneList" class="scrollY" style="margin:2em;overflow-y: auto;display: none">';

            html += '<h1 id="tuner" style="margin: 0"> No Tuners available!</h1>';
            html += '<br />';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStarted">Playback Started Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStarted" id="LiveTvPlaybackStarted" disabled></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStopped">Playback Stopped Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStopped" id="LiveTvPlaybackStopped" disabled></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackPaused">Playback Paused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackPaused" id="LiveTvPlaybackPaused" disabled></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackUnpaused">Playback Unpaused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackUnpaused" id="LiveTvPlaybackUnPaused" disabled></select>';
            html += '</div>';

            html += '</div>';

            html += '<div id="tvSceneList" class="scrollY" style="margin:2em;overflow-y: auto;display: none">';
            html += '<h1 style="margin: 0"><i style="padding-bottom:1%" class="md-icon">tv</i> TV Series</h1>';
            html += '<br />';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStarted">Playback Started Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStarted" id="SeriesPlaybackStarted"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackStopped">Playback Stopped Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackStopped" id="SeriesPlaybackStopped"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackPaused">Playback Paused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackPaused" id="SeriesPlaybackPaused"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraScenePlaybackUnpaused">Playback Unpaused Scene:</label>';
            html += '<select is="emby-select" name="veraScenePlaybackUnpaused" id="SeriesPlaybackUnPaused"></select>';
            html += '</div>';

            html += '</div>';

            html += '<div id="sessionSceneList" class="scrollY" style="margin:2em;overflow-y: auto;display: none">';
            html += '<h1 style="margin: 0" > <i style="padding-bottom:1%" class="md-icon">how_to_reg</i> Sessions</h1>';
            html += '<br />';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraSceneSessionStarted">Session Started Scene:</label>';
            html += '<select is="emby-select" name="veraSceneSessionStarted" id="SessionStarted"></select>';
            html += '</div>';


            html += '<div class="selectContainer" style="margin:2em;">';
            html += '<label class="selectLabel" for="veraSceneSessionEnded">Session Ended Scene:</label>';
            html += '<select is="emby-select" name="veraSceneSessionEnded" id="SessionEnded"></select>';
            html += '</div>';

            html += '</div>';


            html += '<div id="Schedule" class="scrollY" style="margin:2em;overflow-y: auto;display: none">';
            html += '<h1 style="margin: 0"><i style="padding-bottom:1%" class="md-icon">schedule</i> Schedule</h1>';
            html += '<br />';

            html += '<div id="ScheduleTimeInput" style="margin:2em;">';
            html += '<input is="emby-input" id="ScheduleTime" type="time" />';
            html += '<div class="fieldDescription">Allow devices to only trigger scenes after a scheduled time. Scenes will run until 4:00 AM.<br />Leave the time empty to run scenes at any time of day.</div>';
            html += '</div>';

            html += '</div>';

            html += '<div class="formDialogFooter" >';
            html += '<button id="saveButton" is="emby-button" type="submit" class="raised button-submit block formDialogFooterItem emby-button" style="width: 66em;margin: 2em;">Save</button>';
            html += '</div>';

            html += '</div>';
            html += '</div>';



            dlg.innerHTML = html;

                
            var moviePlaybackStartedSelect = dlg.querySelector('#MoviesPlaybackStarted');
            var moviePlaybackStoppedSelect = dlg.querySelector('#MoviesPlaybackStopped');
            var moviePlaybackPausedSelect = dlg.querySelector('#MoviesPlaybackPaused');
            var moviePlaybackUnPausedSelect = dlg.querySelector('#MoviesPlaybackUnPaused');

            var seriesPlaybackStartedSelect = dlg.querySelector('#SeriesPlaybackStarted');
            var seriesPlaybackStoppedSelect = dlg.querySelector('#SeriesPlaybackStopped');
            var seriesPlaybackPausedSelect = dlg.querySelector('#SeriesPlaybackPaused');
            var seriesPlaybackUnPausedSelect = dlg.querySelector('#SeriesPlaybackUnPaused');

            var musicPlaybackStartedSelect = dlg.querySelector('#MusicPlaybackStarted');
            var musicPlaybackStoppedSelect = dlg.querySelector('#MusicPlaybackStopped');
            var musicPlaybackPausedSelect = dlg.querySelector('#MusicPlaybackPaused');
            var musicPlaybackUnPausedSelect = dlg.querySelector('#MusicPlaybackUnPaused');

            var sessionStartedSelect = dlg.querySelector('#SessionStarted');
            var sessionEndedSelect = dlg.querySelector('#SessionEnded');

            var liveTvPlaybackStartedSelect = dlg.querySelector('#LiveTvPlaybackStarted');
            var liveTvPlaybackStoppedSelect = dlg.querySelector('#LiveTvPlaybackStopped');
            var liveTvPlaybackPausedSelect = dlg.querySelector('#LiveTvPlaybackPaused');
            var liveTvPlaybackUnPausedSelect = dlg.querySelector('#LiveTvPlaybackUnPaused');

            var scheduleTime = dlg.querySelector('#ScheduleTime');

            ApiClient.getJSON(ApiClient.getUrl("LiveTvTunerName")).then(
                (result) => {
                    if (result.Name !== "") {
                        dlg.querySelector('#tuner').innerHTML =
                            '<i style="padding-bottom:1%" class="md-icon">live_tv</i> ' + result.Name;
                        dlg.querySelector('#LiveTvPlaybackStarted').disabled = false;
                        dlg.querySelector('#LiveTvPlaybackStopped').disabled = false;
                        dlg.querySelector('#LiveTvPlaybackPaused').disabled = false;
                        dlg.querySelector('#LiveTvPlaybackUnPaused').disabled = false;
                    }
                });

            // z-wave engine could be reloading if the user just created a new scene or removed one -  may have to wait!          

            var statusInterval = setInterval(() => {
                ApiClient.getJSON(ApiClient.getUrl("VeraAlive")).then((zwaveEngineLoaded) => {
                    if (zwaveEngineLoaded === true) {
                        clearInterval(statusInterval);
                    }
                });
            }, 10);

            //Movie Event Scenes
            removeOptionsFromSelect(moviePlaybackStartedSelect);
            removeOptionsFromSelect(moviePlaybackStoppedSelect);
            removeOptionsFromSelect(moviePlaybackPausedSelect);
            removeOptionsFromSelect(moviePlaybackUnPausedSelect);

            // Append an empty option for the purpose of the user selecting no scene events.
            moviePlaybackStartedSelect.innerHTML += ('<option value=""></option>');
            moviePlaybackStoppedSelect.innerHTML += ('<option value=""></option>');
            moviePlaybackPausedSelect.innerHTML += ('<option value=""></option>');
            moviePlaybackUnPausedSelect.innerHTML += ('<option value=""></option>');


            //TV Series Event Scenes
            removeOptionsFromSelect(seriesPlaybackStartedSelect);
            removeOptionsFromSelect(seriesPlaybackStoppedSelect);
            removeOptionsFromSelect(seriesPlaybackPausedSelect);
            removeOptionsFromSelect(seriesPlaybackUnPausedSelect);

            // Append an empty option for the purpose of the user selecting no scene events.
            seriesPlaybackStartedSelect.innerHTML += ('<option value=""></option>');
            seriesPlaybackStoppedSelect.innerHTML += ('<option value=""></option>');
            seriesPlaybackPausedSelect.innerHTML += ('<option value=""></option>');
            seriesPlaybackUnPausedSelect.innerHTML += ('<option value=""></option>');


            //LiveTv Event Scenes
            removeOptionsFromSelect(liveTvPlaybackStartedSelect);
            removeOptionsFromSelect(liveTvPlaybackStoppedSelect);
            removeOptionsFromSelect(liveTvPlaybackPausedSelect);
            removeOptionsFromSelect(liveTvPlaybackUnPausedSelect);

            // Append an empty option for the purpose of the user selecting no scene events.
            liveTvPlaybackStartedSelect.innerHTML += ('<option value=""></option>');
            liveTvPlaybackStoppedSelect.innerHTML += ('<option value=""></option>');
            liveTvPlaybackPausedSelect.innerHTML += ('<option value=""></option>');
            liveTvPlaybackUnPausedSelect.innerHTML += ('<option value=""></option>');


            //Music Event Scenes
            removeOptionsFromSelect(musicPlaybackStartedSelect);
            removeOptionsFromSelect(musicPlaybackStoppedSelect);
            removeOptionsFromSelect(musicPlaybackPausedSelect);
            removeOptionsFromSelect(musicPlaybackUnPausedSelect);

            // Append an empty option for the purpose of the user selecting no scene events.
            musicPlaybackStartedSelect.innerHTML += ('<option value=""></option>');
            musicPlaybackStoppedSelect.innerHTML += ('<option value=""></option>');
            musicPlaybackPausedSelect.innerHTML += ('<option value=""></option>');
            musicPlaybackUnPausedSelect.innerHTML += ('<option value=""></option>');


            // Session Event Scenes
            removeOptionsFromSelect(sessionStartedSelect);
            removeOptionsFromSelect(sessionEndedSelect);

            // Append an empty option for the purpose of the user selecting no scene events.
            sessionStartedSelect.innerHTML += ('<option value=""></option>');
            sessionEndedSelect.innerHTML += ('<option value=""></option>');


            //Put the List of Scenes in the Selection Box
            ApiClient.getJSON(ApiClient.getUrl("VeraSceneList")).then(
                (scenes) => {
                    if (scenes.length > 0) {
                        scenes.forEach((scene) => {
                            moviePlaybackStartedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            moviePlaybackStoppedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            moviePlaybackPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            moviePlaybackUnPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            seriesPlaybackStartedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            seriesPlaybackStoppedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            seriesPlaybackPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            seriesPlaybackUnPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            liveTvPlaybackStartedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            liveTvPlaybackStoppedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            liveTvPlaybackPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            liveTvPlaybackUnPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            musicPlaybackStartedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            musicPlaybackStoppedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            musicPlaybackPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            musicPlaybackUnPausedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            sessionStartedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                            sessionEndedSelect.innerHTML += ('<option value="' +
                                scene.name +
                                '">' +
                                scene.name +
                                '</option>');
                        });
                    }
                });

            if (moviePlaybackStartedSelect.length > 0) {

                ApiClient.getPluginConfiguration(pluginId).then(
                    (config) => {

                        // If the user has created a page for this client before, we should put the page together the way they left it.
                        if (config.SavedDeviceProfiles) {
                            config.SavedDeviceProfiles.forEach(
                                (c) => {
                                    if (c.Name === profileName &&
                                        c.AppName === profileApp) {

                                        // Set previously edited scenes and options

                                        //Movies
                                        moviePlaybackStartedSelect.value =
                                            c.MoviesPlaybackStarted;
                                        moviePlaybackStoppedSelect.value =
                                            c.MoviesPlaybackStopped;
                                        moviePlaybackPausedSelect.value =
                                            c.MoviesPlaybackPaused;
                                        moviePlaybackUnPausedSelect.value =
                                            c.MoviesPlaybackUnPaused;


                                        //TV Series
                                        seriesPlaybackStartedSelect.value =
                                            c.SeriesPlaybackStarted;
                                        seriesPlaybackStoppedSelect.value =
                                            c.SeriesPlaybackStopped;
                                        seriesPlaybackPausedSelect.value =
                                            c.SeriesPlaybackPaused;
                                        seriesPlaybackUnPausedSelect.value =
                                            c.SeriesPlaybackUnPaused;


                                        //Music
                                        musicPlaybackStartedSelect.value =
                                            c.MusicPlaybackStarted;
                                        musicPlaybackStoppedSelect.value =
                                            c.MusicPlaybackStopped;
                                        musicPlaybackPausedSelect.value = c.MusicPlaybackPaused;
                                        musicPlaybackUnPausedSelect.value =
                                            c.MusicPlaybackUnPaused;

                                        //LiveTv
                                        liveTvPlaybackStartedSelect.value =
                                            c.LiveTvPlaybackStarted;
                                        liveTvPlaybackStoppedSelect.value =
                                            c.LiveTvPlaybackStopped;
                                        liveTvPlaybackPausedSelect.value =
                                            c.LiveTvPlaybackPaused;
                                        liveTvPlaybackUnPausedSelect.value =
                                            c.LiveTvPlaybackUnPaused;


                                        //Sessions
                                        sessionStartedSelect.value = c.SessionStarted;
                                        sessionEndedSelect.value = c.SessionEnded;

                                        scheduleTime.value = c.SceneSchedule;
                                    }
                                });
                        }

                        var deviceConfig = {
                            Name: profileName,
                            Id: profileId,
                            AppName: profileApp
                        };

                        config.DeviceConfiguration = deviceConfig;

                        ApiClient.updatePluginConfiguration(pluginId, config)
                            .then(function (result) {

                            });

                    });

            }



            dlg.querySelector('#saveButton').addEventListener('click',
                (event) => {
                    event.preventDefault();

                    var deviceProfiles = [];
                    var pushedDevice;

                    var moviePlaybackStartedSelect = dlg.querySelector('#MoviesPlaybackStarted');
                    var moviePlaybackStoppedSelect = dlg.querySelector('#MoviesPlaybackStopped');
                    var moviePlaybackPausedSelect = dlg.querySelector('#MoviesPlaybackPaused');
                    var moviePlaybackUnPausedSelect = dlg.querySelector('#MoviesPlaybackUnPaused');

                    var seriesPlaybackStartedSelect = dlg.querySelector('#SeriesPlaybackStarted');
                    var seriesPlaybackStoppedSelect = dlg.querySelector('#SeriesPlaybackStopped');
                    var seriesPlaybackPausedSelect = dlg.querySelector('#SeriesPlaybackPaused');
                    var seriesPlaybackUnPausedSelect = dlg.querySelector('#SeriesPlaybackUnPaused');

                    var musicPlaybackStartedSelect = dlg.querySelector('#MusicPlaybackStarted');
                    var musicPlaybackStoppedSelect = dlg.querySelector('#MusicPlaybackStopped');
                    var musicPlaybackPausedSelect = dlg.querySelector('#MusicPlaybackPaused');
                    var musicPlaybackUnPausedSelect = dlg.querySelector('#MusicPlaybackUnPaused');

                    var liveTvPlaybackStartedSelect = dlg.querySelector('#LiveTvPlaybackStarted');
                    var liveTvPlaybackStoppedSelect = dlg.querySelector('#LiveTvPlaybackStopped');
                    var liveTvPlaybackPausedSelect = dlg.querySelector('#LiveTvPlaybackPaused');
                    var liveTvPlaybackUnPausedSelect = dlg.querySelector('#LiveTvPlaybackUnPaused');


                    var sessionStartedSelect = dlg.querySelector('#SessionStarted');
                    var sessionEndedSelect = dlg.querySelector('#SessionEnded');

                    var sceneScheduleInput = dlg.querySelector('#ScheduleTime');


                    ApiClient.getPluginConfiguration(pluginId).then(function (config) {

                        var newDeviceSetup = {
                            Name: config.DeviceConfiguration.Name,
                            Id: config.DeviceConfiguration.Id,
                            AppName: config.DeviceConfiguration.AppName,

                            MoviesPlaybackStarted:
                                moviePlaybackStartedSelect.options[moviePlaybackStartedSelect
                                    .selectedIndex >=
                                    0
                                    ? moviePlaybackStartedSelect.selectedIndex
                                    : 0].value,
                            MoviesPlaybackPaused:
                                moviePlaybackPausedSelect.options[moviePlaybackPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? moviePlaybackPausedSelect.selectedIndex
                                    : 0].value,
                            MoviesPlaybackStopped:
                                moviePlaybackStoppedSelect.options[moviePlaybackStoppedSelect
                                    .selectedIndex >=
                                    0
                                    ? moviePlaybackStoppedSelect.selectedIndex
                                    : 0].value,
                            MoviesPlaybackUnPaused:
                                moviePlaybackUnPausedSelect.options[moviePlaybackUnPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? moviePlaybackUnPausedSelect.selectedIndex
                                    : 0].value,

                            SeriesPlaybackStarted:
                                seriesPlaybackStartedSelect.options[seriesPlaybackStartedSelect
                                    .selectedIndex >=
                                    0
                                    ? seriesPlaybackStartedSelect.selectedIndex
                                    : 0].value,
                            SeriesPlaybackPaused:
                                seriesPlaybackPausedSelect.options[seriesPlaybackPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? seriesPlaybackPausedSelect.selectedIndex
                                    : 0].value,
                            SeriesPlaybackStopped:
                                seriesPlaybackStoppedSelect.options[seriesPlaybackStoppedSelect
                                    .selectedIndex >=
                                    0
                                    ? seriesPlaybackStoppedSelect.selectedIndex
                                    : 0].value,
                            SeriesPlaybackUnPaused:
                                seriesPlaybackUnPausedSelect.options[seriesPlaybackUnPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? seriesPlaybackUnPausedSelect.selectedIndex
                                    : 0].value,

                            MusicPlaybackStarted:
                                musicPlaybackStartedSelect.options[musicPlaybackStartedSelect
                                    .selectedIndex >=
                                    0
                                    ? musicPlaybackStartedSelect.selectedIndex
                                    : 0].value,
                            MusicPlaybackPaused:
                                musicPlaybackPausedSelect.options[musicPlaybackPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? musicPlaybackPausedSelect.selectedIndex
                                    : 0].value,
                            MusicPlaybackStopped:
                                musicPlaybackStoppedSelect.options[musicPlaybackStoppedSelect
                                    .selectedIndex >=
                                    0
                                    ? musicPlaybackStoppedSelect.selectedIndex
                                    : 0].value,
                            MusicPlaybackUnPaused:
                                musicPlaybackUnPausedSelect.options[musicPlaybackUnPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? musicPlaybackUnPausedSelect.selectedIndex
                                    : 0].value,

                            LiveTvPlaybackStarted:
                                liveTvPlaybackStartedSelect.options[liveTvPlaybackStartedSelect
                                    .selectedIndex >=
                                    0
                                    ? liveTvPlaybackStartedSelect.selectedIndex
                                    : 0].value,
                            LiveTvPlaybackPaused:
                                liveTvPlaybackPausedSelect.options[liveTvPlaybackPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? liveTvPlaybackPausedSelect.selectedIndex
                                    : 0].value,
                            LiveTvPlaybackStopped:
                                liveTvPlaybackStoppedSelect.options[liveTvPlaybackStoppedSelect
                                    .selectedIndex >=
                                    0
                                    ? liveTvPlaybackStoppedSelect.selectedIndex
                                    : 0].value,
                            LiveTvPlaybackUnPaused:
                                liveTvPlaybackUnPausedSelect.options[liveTvPlaybackUnPausedSelect
                                    .selectedIndex >=
                                    0
                                    ? liveTvPlaybackUnPausedSelect.selectedIndex
                                    : 0].value,

                            SessionStarted: sessionStartedSelect.options[sessionStartedSelect
                                .selectedIndex >=
                                0
                                ? sessionStartedSelect.selectedIndex
                                : 0].value,
                            SessionEnded: sessionEndedSelect.options[sessionEndedSelect.selectedIndex >=
                                0
                                ? sessionEndedSelect.selectedIndex
                                : 0].value,

                            SceneSchedule: sceneScheduleInput.value
                        };

                        deviceProfiles.push(newDeviceSetup);

                        if (config.SavedDeviceProfiles) {
                            config.SavedDeviceProfiles.forEach(function (c) {
                                if (c.Name !== config.DeviceConfiguration.Name &&
                                    c.AppName !== config.DeviceConfiguration.AppName) {
                                    pushedDevice = {
                                        Name: c.Name,
                                        Id: c.Id,
                                        AppName: c.AppName,
                                        MoviesPlaybackStarted: c.MoviesPlaybackStarted,
                                        MoviesPlaybackStopped: c.MoviesPlaybackStopped,
                                        MoviesPlaybackPaused: c.MoviesPlaybackPaused,
                                        MoviesPlaybackUnpaused: c.MoviesPlaybackUnPaused,
                                        SeriesPlaybackStarted: c.SeriesPlaybackStarted,
                                        SeriesPlaybackStopped: c.SeriesPlaybackStopped,
                                        SeriesPlaybackPaused: c.SeriesPlaybackPaused,
                                        SeriesPlaybackUnpaused: c.SeriesPlaybackUnPaused,
                                        MusicPlaybackStarted: c.MusicPlaybackStarted,
                                        MusicPlaybackStopped: c.MusicPlaybackStopped,
                                        MusicPlaybackPaused: c.MusicPlaybackPaused,
                                        MusicPlaybackUnpaused: c.MusicPlaybackUnPaused,
                                        LiveTvPlaybackStarted: c.LiveTvPlaybackStarted,
                                        LiveTvPlaybackStopped: c.LiveTvPlaybackStopped,
                                        LiveTvPlaybackPaused: c.LiveTvPlaybackPaused,
                                        LiveTvPlaybackUnpaused: c.LiveTvPlaybackUnPaused,
                                        SessionEnded: c.SessionEnded,
                                        SessionStarted: c.SessionStarted,
                                        SceneSchedule: c.SceneSchedule

                                    };
                                    deviceProfiles.push(pushedDevice);
                                }
                            });
                        }

                        Dashboard.alert({
                            title: config.DeviceConfiguration.AppName +
                                " on " +
                                config.DeviceConfiguration.Name +
                                " will now trigger home automation events!",
                            message: ""
                        });

                        config.SavedDeviceProfiles = deviceProfiles;
                        config.DeviceConfiguration = { Name: null, Id: null, AppName: null };
                        var table = view.querySelector('.clientProfiles');
                        table.innerHTML = "";
                        ApiClient.updatePluginConfiguration(pluginId, config).then(function (result) {
                            config.SavedDeviceProfiles.forEach((profile) => {

                                table.innerHTML += getProfileTableHtml(profile, svgIcon(profile.Name, profile.AppName));

                                view.querySelectorAll('.clientProfile').forEach(profileButton => {
                                    profileButton.addEventListener('click',
                                        (e) => {
                                            e.preventDefault();

                                            Dashboard.showLoadingMsg();

                                            var ele = e.target.closest('tr');
                                            var profileId = ele.dataset.id;
                                            var profileName = ele.dataset.name;
                                            var profileApp = ele.dataset.app;
                                            openDialog(profileName, profileApp, profileId, view);
                                        });
                                });

                                var delButtons = view.querySelectorAll('.btnDeleteProfile');
                                delButtons.forEach((button) => {
                                    button.addEventListener('click',
                                        (e) => {
                                            removeClientProfile(e, view);
                                        });
                                });
                                   
                            }); 
                            Dashboard.processPluginConfigurationUpdateResult(result);

                        });

                    });

                    dialogHelper.close(dlg);
                });

            dlg.querySelector("#showMovieList").addEventListener('click',
                (event) => {
                    event.preventDefault();
                    dlg.querySelector('#tvSceneList').style.display = 'none';
                    dlg.querySelector('#movieSceneList').style.display = 'block';
                    dlg.querySelector('#musicSceneList').style.display = 'none';
                    dlg.querySelector('#sessionSceneList').style.display = 'none';
                    dlg.querySelector('#Schedule').style.display = 'none';
                    dlg.querySelector('#liveTvSceneList').style.display = 'none';

                });

            dlg.querySelector("#showTvList").addEventListener('click',
                (event) => {
                    event.preventDefault();
                    dlg.querySelector('#tvSceneList').style.display = 'block';
                    dlg.querySelector('#movieSceneList').style.display = 'none';
                    dlg.querySelector('#musicSceneList').style.display = 'none';
                    dlg.querySelector('#sessionSceneList').style.display = 'none';
                    dlg.querySelector('#Schedule').style.display = 'none';
                    dlg.querySelector('#liveTvSceneList').style.display = 'none';

                });

            dlg.querySelector("#showMusicList").addEventListener('click',
                (event) => {
                    event.preventDefault();
                    dlg.querySelector('#tvSceneList').style.display = 'none';
                    dlg.querySelector('#movieSceneList').style.display = 'none';
                    dlg.querySelector('#musicSceneList').style.display = 'block';
                    dlg.querySelector('#sessionSceneList').style.display = 'none';
                    dlg.querySelector('#Schedule').style.display = 'none';
                    dlg.querySelector('#liveTvSceneList').style.display = 'none';

                });

            dlg.querySelector("#showSessionList").addEventListener('click',
                (event) => {
                    event.preventDefault();
                    dlg.querySelector('#tvSceneList').style.display = 'none';
                    dlg.querySelector('#movieSceneList').style.display = 'none';
                    dlg.querySelector('#musicSceneList').style.display = 'none';
                    dlg.querySelector('#sessionSceneList').style.display = 'block';
                    dlg.querySelector('#Schedule').style.display = 'none';
                    dlg.querySelector('#liveTvSceneList').style.display = 'none';

                });

            dlg.querySelector('#showLiveTvList').addEventListener('click',
                (event) => {
                    event.preventDefault();
                    dlg.querySelector('#tvSceneList').style.display = 'none';
                    dlg.querySelector('#movieSceneList').style.display = 'none';
                    dlg.querySelector('#musicSceneList').style.display = 'none';
                    dlg.querySelector('#sessionSceneList').style.display = 'none';
                    dlg.querySelector('#Schedule').style.display = 'none';
                    dlg.querySelector('#liveTvSceneList').style.display = 'block';

                });

            dlg.querySelector("#showSchedule").addEventListener('click',
                (event) => {
                    event.preventDefault();
                    dlg.querySelector('#tvSceneList').style.display = 'none';
                    dlg.querySelector('#movieSceneList').style.display = 'none';
                    dlg.querySelector('#musicSceneList').style.display = 'none';
                    dlg.querySelector('#sessionSceneList').style.display = 'none';
                    dlg.querySelector('#Schedule').style.display = 'block';
                    dlg.querySelector('#liveTvSceneList').style.display = 'none';


                });

            dlg.querySelector('.btnCloseDialog').addEventListener('click',
                (event) => {
                    dialogHelper.close(dlg);
                });



            dialogHelper.open(dlg);


            Dashboard.hideLoadingMsg();




        }

        return function(view) {

            view.addEventListener('viewshow',
                () => {

                    loadConfig(view);

                    view.querySelector('#veraDeviceIps').addEventListener('change',
                        () => {
                            ApiClient.getPluginConfiguration(pluginId).then(
                                (config) => {
                                    config.SaveVeraDeviceIp = view.querySelector('#veraDeviceIps').value;

                                    ApiClient.updatePluginConfiguration(pluginId, config).then(
                                        (result) => {
                                            Dashboard.hideLoadingMsg();
                                            Dashboard.processPluginConfigurationUpdateResult(result);
                                        });
                                });
                        });

                    view.querySelector('#addButton').addEventListener('click',
                        (e) => {
                            e.preventDefault;
                            var deviceNameSelect = view.querySelector('#deviceName');
                            var table = view.querySelector('.clientProfiles');
                            table.innerHTML = "";

                            var deviceName = deviceNameSelect.options[deviceNameSelect.selectedIndex >= 0
                                ? deviceNameSelect.selectedIndex
                                : 0].dataset.name;
                            var deviceApp = deviceNameSelect.options[deviceNameSelect.selectedIndex >= 0
                                ? deviceNameSelect.selectedIndex
                                : 0].dataset.app;
                            var deviceId = deviceNameSelect.options[deviceNameSelect.selectedIndex >= 0
                                ? deviceNameSelect.selectedIndex
                                : 0].dataset.id;

                            ApiClient.getPluginConfiguration(pluginId).then((config) => { 
                                config.SavedDeviceProfiles.push({
                                    Name: deviceName,
                                    Id: deviceId,
                                    AppName: deviceApp,
                                    MoviesPlaybackStarted: "",
                                    MoviesPlaybackStopped: "",
                                    MoviesPlaybackPaused: "",
                                    MoviesPlaybackUnPaused: "",
                                    SeriesPlaybackStarted: "",
                                    SeriesPlaybackStopped: "",
                                    SeriesPlaybackPaused: "",
                                    SeriesPlaybackUnPaused: "",
                                    MusicPlaybackStarted: "",
                                    MusicPlaybackStopped: "",
                                    MusicPlaybackPaused: "",
                                    MusicPlaybackUnPaused: "",
                                    SessionEnded: "",
                                    SessionStarted: "",
                                    SceneSchedule: ""
                                });

                                config.SavedDeviceProfiles.forEach((profile) => {

                                    table.innerHTML += getProfileTableHtml(profile,
                                        svgIcon(profile.Name, profile.AppName));

                                    view.querySelectorAll('.clientProfile').forEach(profileButton => {
                                        profileButton.addEventListener('click',
                                            (e) => {
                                                e.preventDefault();

                                                Dashboard.showLoadingMsg();

                                                var ele = e.target.closest('tr');
                                                var profileId = ele.dataset.id;
                                                var profileName = ele.dataset.name;
                                                var profileApp = ele.dataset.app;
                                                openDialog(profileName, profileApp, profileId, view);
                                            });
                                    });

                                    var delButtons = view.querySelectorAll('.btnDeleteProfile');
                                    delButtons.forEach((button) => {
                                        button.addEventListener('click',
                                            (e) => {
                                                removeClientProfile(e, view);
                                            });
                                    });


                                    ApiClient.updatePluginConfiguration(pluginId, config).then(
                                        (result) => {
                                            Dashboard.processPluginConfigurationUpdateResult(result);
                                        });
                                });
                            });
                        });

                });
        }  

    });




