function Controller() {
    installer.installationFinished.connect(function() {
        gui.clickButton(buttons.NextButton, 3000);
    });
    installer.setMessageBoxAutomaticAnswer("OverwriteTargetDirectory", QMessageBox.Yes);
    installer.setMessageBoxAutomaticAnswer("installationErrorWithRetry", QMessageBox.Ignore);
}
Controller.prototype.WelcomePageCallback = function() {
    console.log("Welcome Page");
    gui.clickButton(buttons.NextButton, 3000);
}
Controller.prototype.CredentialsPageCallback = function() {
    gui.clickButton(buttons.CommitButton, 3000);
}
Controller.prototype.ComponentSelectionPageCallback = function() {
    console.log("Select components");
    function trim(str) {
        return str.replace(/^ +/,"").replace(/ *$/,"");
    }
    var widget = gui.currentPageWidget();
    var packages = installer.environmentVariable("QT_PACKAGES");
    packages = trim(packages).split(",")
    if (packages.length > 0 && packages[0] !== "") {
        widget.deselectAll();
        for (var i in packages) {
            var pkg = trim(packages[i]);
            console.log("Select " + pkg);
            widget.selectComponent(pkg);
        }
    } else {
       console.log("Use default component list");
    }
    gui.clickButton(buttons.NextButton, 3000);
}
Controller.prototype.IntroductionPageCallback = function() {
    console.log("Introduction Page");
    console.log("Retrieving meta information from remote repository");
    gui.clickButton(buttons.NextButton, 3000);
}
Controller.prototype.TargetDirectoryPageCallback = function() {
    var targetPath = installer.environmentVariable("QT_PATH") || "/opt/qt";
    console.log("Set target installation page: " + targetPath);
    var widget = gui.currentPageWidget();
    if (widget != null) {
        widget.TargetDirectoryLineEdit.setText(targetPath);
    }
    gui.clickButton(buttons.NextButton, 3000);
}
Controller.prototype.LicenseAgreementPageCallback = function() {
    console.log("Accept license agreement");
    var widget = gui.currentPageWidget();
    if (widget != null) {
        widget.AcceptLicenseRadioButton.setChecked(true);
    }
    gui.clickButton(buttons.NextButton, 3000);
}
Controller.prototype.ReadyForInstallationPageCallback = function() {
    console.log("Ready to install");
    gui.clickButton(buttons.CommitButton, 3000);
}
Controller.prototype.FinishedPageCallback = function() {
    var widget = gui.currentPageWidget();
    if (widget.LaunchQtCreatorCheckBoxForm) {
        // No this form for minimal platform
        widget.LaunchQtCreatorCheckBoxForm.launchQtCreatorCheckBox.setChecked(false);
    }
    gui.clickButton(buttons.FinishButton, 3000);
}
