<?php

use MaximeRainville\SilverstripeReact\BootstrapComponent;
use SilverStripe\Security\Security;
use SilverStripe\View\ViewableData;

class Widget extends ViewableData
{
    use BootstrapComponent;

    public function getProps(): array {
        $member = Security::getCurrentUser();

        return [
            'firstname' => $member->FirstName,
            'lastname' => $member->LastName,
            'email' => $member->Email,
        ];
    }

    public function getComponent(): string {
        return 'Widget';
    }
}
