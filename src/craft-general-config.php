<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => array(
        'maxUploadFileSize' => 100000000,
        'omitScriptNameInUrls' => true,
        'devMode' => true,
        'environmentVariables' => array(
            'basePath' => '/var/www',
            'baseUrl'  => 'http://localhost/',
        ),
    ),
);