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

    public function getClientConfig()
    {
        $baseLink = $this->Link();

        return array_merge(parent::getClientConfig(), [
            'reactRouter' => true,
            'randomRestEndpoint' => [
                'url' => Controller::join_links($baseLink, 'api/random'),
                'method' => 'post',
                'payloadFormat' => 'urlencoded',
            ],
            'form' => [
                'fileEditForm' => [
                    'schemaUrl' => $this->Link('schema/fileEditForm')
                ],
            ],
        ]);
    }

}
