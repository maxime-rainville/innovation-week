<?php

use MaximeRainville\SilverstripeReact\ReactAdmin;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

class InnovationWeek extends ReactAdmin
{
    private static $url_segment = 'innovation';

    private static $menu_title = 'Innovation Week';

    private static $url_handlers = [
        // Only /admin/innovation/foo is a valid route
        'foo//' => 'index',

        // This route accepts parameters, so we give a wild card
        'bar//$*' => 'index',
    ];

    public function getComponent(): string
    {
        return 'InnovationWeek';
    }

    public function getProps(): array
    {
        return [
            'breadcrumbs' => [
                [
                    'text'=> 'Home',
                    'href'=> '',
                ],
                [
                    'text'=> 'Foo',
                    'href'=> 'foo',
                ],
                [
                    'text'=> 'Bar',
                    'href'=> 'bar',
                ],

            ]
        ];
    }

}
