<?php

use MaximeRainville\SilverstripeReact\ReactAdmin;

class Misconfigured extends ReactAdmin
{
    private static $url_segment = 'Misconfigured';

    private static $menu_title = 'Misconfigured';

    public function getComponent(): string
    {
        return 'ComponentThatDoesNotExist';
    }

}
