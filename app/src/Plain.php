<?php

use MaximeRainville\SilverstripeReact\ReactAdmin;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

class Plain extends ReactAdmin
{
    private static $url_segment = 'plain';
    private static $menu_title = 'Plain';
}
