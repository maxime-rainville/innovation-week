<?php

use MaximeRainville\SilverstripeReact\ReactAdmin;
use PharIo\Manifest\Requirement;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\View\Requirements;

class InnovationWeek extends ReactAdmin
{
    private static $url_segment = 'innovation';

    private static $menu_title = 'Innovation Week';

    public function getProps(): array
    {
        return [
            'mdUrl' => ModuleResourceLoader::singleton()->resolveURL('app/help/index.md')
        ];
    }

    public function getComponent(): string
    {
        return 'InnovationWeek';
    }

}
