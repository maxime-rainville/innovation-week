<?php

use MaximeRainville\SilverstripeReact\ReactAdmin;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\TextField;

class Todo extends ReactAdmin
{
    private static $url_segment = 'todo';

    private static $menu_title = 'Todo List';

    private static $menu_icon_class = 'font-icon-checklist';

    private static $allowed_actions = [
        'formSchema'
    ];

    private static $url_handlers = [
        // This matches thi index routo
        'show//$ID' => 'index',
    ];

    public function getComponent(): string
    {
        return 'Todo';
    }

    public function getProps(): array
    {
        return [
        ];
    }

    public function formSchema()
    {
        return $this->getSchemaResponse(
            'add',
            Form::create(
                $this,
                'add',
                FieldList::create(
                    TextField::create('title', 'Title'),
                    TextField::create('body', 'Body')
                ),
                FieldList::create(
                    FormAction::create('add', 'Add')->addExtraClass('btn-primary')
                )
            )
        );
    }

}
