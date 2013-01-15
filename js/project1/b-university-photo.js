$(document).ready(function() {

    var photos = $('.b-university-photo .b-link').get();
    var photosSize = photos.length;
    var photosIndex;

    $('.b-university-photo .b-link').click(function() {
        var $popup = $('.b-popupa_type_photo');
        var $popupPhoto = $popup.find('.b-popupa__content .b-icon');

        var $self = $(this);
        var photoUrl = $self.attr('href');

        photosIndex = $self.index();

        $popupPhoto.attr('src', photoUrl);
        $popupPhoto.load(function() {
            $popup.bem('b-popupa').show($self);
        });

        return false;
    });

    $('.b-university-photo_type_popup .b-icon').click(function() {
        var $self = $(this);
        var next = (photosIndex == photosSize - 1 ? 0 : photosIndex + 1);

        photosIndex = next;
        $self.attr('src', photos[next].href);
    });

});
