# Showing, Editing, Updating and Deleting the Resources

## Showing

-   What does the `show` method do?
    -   It is responsible for displaying the page/component that will render a single model object.
-   Go to the Controller file for the model.
-   Locate the `show` method and within it, return an inertia render for the '<Model>/Show' page/component.

```php
    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResource($feature)
        ]);
    }
```

---

## Editing

-   What does the `edit` method do?
    -   It is responsible for displaying the page/component that will render the form for creating the corresponding model.
    -   It takes the feature that will be displayed, passed in as the resource id and converted to the resource behind the scenes.

```php
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResource($feature)
        ]);
    }
```

---

## Updating

-   What does the `updating` method do?
    -   It is responsible for editing the corresponding resource.
    -   It takes the feature that will be displayed, passed in as the resource id and converted to the resource behind the scenes.
    -   It also takes the request in order to extract the body.

```php
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $feature->update($data);

        to_route('feature.index')->with('success', 'Feature updated successfully');
    }
```

---

## Deleting

-   What does the `delete` method do?
    -   It is responsible for deleting the corresponding resource.
    -   It takes the feature that will be displayed, passed in as the resource id and converted to the resource behind the scenes.

```php
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();

        to_route('feature.index')->with('success', 'Feature deleted successfully');
    }
```
