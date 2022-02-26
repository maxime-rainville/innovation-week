<?php

use MaximeRainville\SilverstripeReact\ReactAdmin;

class InnovationWeek extends ReactAdmin
{
    private static $url_segment = 'innovation';
    private static $menu_title = 'Innovation Week';

    public function getComponent(): string
    {
        return 'InnovationWeek';
    }

    public function getProps(): array
    {
        return [
            'foo' => 'bar',
            'baz' => 'qux',
        ];
    }

}
