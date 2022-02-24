<?php

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\FormAction;
use SilverStripe\Forms\TextField;
use MaximeRainville\CopyField\CopyField;

class OldSchoolAdmin extends LeftAndMain
{
    private static $url_segment = 'old-school';

    private static $menu_title = 'Old School';

    public function Form($id = null, $fields = null)
    {
        return Form::create(
            $this,
            'EditForm',
            FieldList::create(
                TextField::create('Name'),
                CopyField::create('ReactField')->setValue('Hello World')
            ),
            FieldList::create(
                FormAction::create('doSave', 'Save')->addExtraClass('btn-primary')
            )
        );
    }

    public function Widget()
    {
        return Widget::create();
    }
}
