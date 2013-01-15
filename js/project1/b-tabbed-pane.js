$(document).ready(function() {
    
    var $tabbedPane = $('.b-tabbed-pane');
    var $tabbedPanePanel = $tabbedPane.find('.b-tabbed-pane__panel');

    var $tabbedPaneTab = $tabbedPane.find('.b-tabbed-pane__tab');
    var $tabbedPaneTabLink = $tabbedPaneTab.find('.b-link');

    $tabbedPaneTabLink.click(function() {
        if (!$(this).closest('.b-tabbed-pane__tab').hasClass('b-tabbed-pane__tab_state_current')) {
            $tabbedPaneTab.toggleClass('b-tabbed-pane__tab_state_current');

            $tabbedPanePanel.toggleClass('b-tabbed-pane__panel_state_current');
        }
    });

});
