django.jQuery(function($) {
    'use strict';

    // be more intuitive, reorganize layout by moving fieldset 'Customers' on the top
    $('#baseuser-group').insertAfter($('#baseuserproxy_form fieldset:first-child').first());

});