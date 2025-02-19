# Configuring Routes

## Using the Resource method

-   This method tells Laravel to generate the routes for all 7 Controllers for the Model.

```php
    Route::resource('feature', FeatureController::class);
```

```bash
    $ php artisan route:list
    //to list the routes
```

## Using individual HTTP Methods

-   With this, you can specify the routes individually

```php
    Route::get('/feature', [FeatureController::class, 'index'])->name('feature.index');
```
