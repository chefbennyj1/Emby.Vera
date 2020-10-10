
define(["loading", "dialogHelper", "emby-select", "emby-input"],
    function (loading, dialogHelper) {

        var pluginId = "df04d306-8cbb-49d5-9107-20581aacf86f";
         
        function getProfileTableHtml(device, svg) {
            var html = ''; 
            html += '<tr class="detailTableBodyRow detailTableBodyRow-shaded" data-name="' +
                device.Name +
                '" data-id="' +
                device.Id +
                '" data-app="' +
                device.AppName +
                '">';
            html +=
                '<td data-title="Icon" class="detailTableBodyCell fileCell"><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.3)" d="' +
                svg +
                '" /></svg></td>';
            html +=
                '<td data-title="Edit" class="detailTableBodyCell fileCell"><button class="clientProfile emby-button"><svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.3)" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg></button></td>';
            html += '<td data-title="Name" class="detailTableBodyCell fileCell-shaded">' +
                device.Name +
                '</td>';
            html += '<td data-title="App" class="detailTableBodyCell fileCell-shaded">' +
                device.AppName +
                '</td>';
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
                ApiClient.getJSON(ApiClient.getUrl("EmbyDeviceSvg?AppName=" + profile.AppName + "&DeviceName=" + profile.Name)).then(
                    result => {
                        table.innerHTML += getProfileTableHtml(profile, result.svg);

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
            var appName = e.target.closest('tr').dataset.appName;

            ApiClient.getPluginConfiguration(pluginId).then((config) => {
                var profiles = config.SavedDeviceProfiles.filter(p => p.Name !== name && p.AppName !== appName);
                config.SavedDeviceProfiles = profiles;
                ApiClient.updatePluginConfiguration(pluginId, config).then(
                    (result) => {
                        var table = view.querySelector('.clientProfiles');
                        table.innerHTML = "";
                        config.SavedDeviceProfiles.forEach((profile) => {
                            ApiClient.getJSON(ApiClient.getUrl("EmbyDeviceSvg?AppName=" +
                                profile.AppName +
                                "&DeviceName=" +
                                profile.Name)).then(
                                result => {
                                    table.innerHTML += getProfileTableHtml(profile, result.svg);

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

                        ApiClient.updatePluginConfiguration(pluginId, config).then(function (result) {
                            var table = view.querySelector('.clientProfiles');
                            table.innerHTML = "";
                            config.SavedDeviceProfiles.forEach(
                                (device) => {
                                    getProfileTableHtml(device).then(html => {
                                        view.querySelector('.clientProfiles').innerHTML += html;

                                        view.querySelectorAll('.btnDeleteProfile').forEach(delButton => {
                                            delButton.addEventListener('click',
                                                (e) => {
                                                    e.preventDefault();
                                                    // the device name the user wants to remove from configuration
                                                    var name = e.target.closest('tr').dataset.name;
                                                    var appName = e.target.closest('tr').dataset.appName;
                                                    // Our list of devices to write to the Configuration
                                                    var devices = [];
                                                    // Our list of devices that already exist - with the exception of the device which was just removed from the list
                                                    ApiClient.getPluginConfiguration(pluginId).then((config) => {
                                                        config.SavedDeviceProfiles.forEach((c) => {
                                                            if (c.Name !== name && c.AppName !== appName) {
                                                                devices.push(c);
                                                            }
                                                        });
                                                        var table = view.querySelector('.clientProfiles');
                                                        table.innerHTML = "";
                                                        config.SavedDeviceProfiles.forEach(deviceProfile => {
                                                            table.innerHTML += (getProfileTableHtml(deviceProfile));
                                                        });
                                                        config.SavedDeviceProfiles = devices;
                                                        ApiClient.updatePluginConfiguration(pluginId, config).then(
                                                            (result) => {
                                                                Dashboard.hideLoadingMsg();
                                                                Dashboard.processPluginConfigurationUpdateResult(result);
                                                            });
                                                    });

                                                });
                                        });

                                        view.querySelectorAll('.clientProfile').forEach(profileButton => {
                                            profileButton.addEventListener('click',
                                                (e) => {
                                                    e.preventDefault();

                                                    Dashboard.showLoadingMsg();

                                                    var ele = e.target.closest('tr');
                                                    // Retrieve name and id info about the Media Browser Network Device the user has clicked on
                                                    var profileId = ele.dataset.id;
                                                    var profileName = ele.dataset.name;
                                                    var profileApp = ele.dataset.app;
                                                    openDialog(profileName, profileApp, profileId, view);
                                                });
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
                                    ApiClient.getJSON(ApiClient.getUrl("EmbyDeviceSvg?AppName=" + profile.AppName + "&DeviceName=" + profile.Name)).then(
                                        icon => {
                                            table.innerHTML += getProfileTableHtml(profile, icon.svg);

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

                                ApiClient.updatePluginConfiguration(pluginId, config).then(
                                    (result) => {
                                        Dashboard.processPluginConfigurationUpdateResult(result);
                                    }); 
                            });
                        });

                });
        }  

    });




