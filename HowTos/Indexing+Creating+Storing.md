# Indexing, Creating and Storing Resources

## Indexing

-   What does the `index` method do?
    -   It is responsible for displaying the page/component that will render all the resource.
    -   It is best practice to create a resource, something like a DTO, for the model therein we specify the datafields we want to return from the model's database to the client:
    ```bash
        $ php artisan make:resource FeatureResource
    ```
    -   Then make your changes as you see fit, then return that:
    ```php
        class FeatureResource extends JsonResource
        {
            /**
            * Transform the resource into an array.
            *
            * @return array<string, mixed>
            */
            public function toArray(Request $request): array
            {
                return [
                    'id' => $this->id,
                    'name' => $this->name,
                    'description' => $this->description,
                    'user' => $this->user,
                    'created_at' => $this->created_at->format('Y-m-d H:i:s')
                ];
            }
        }
    ```

```php
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated = Feature::latest()->paginate();
        return Inertia::render('Feature/Index', [
            'features' => FeatureResource::collection($paginated)
        ]);
    }
```

---

## Creating

-   What does the `create` method do?
    -   It is responsible for displaying the page/component that will render the form for creating the corresponding model.
-   Go to the Controller file for the model.
-   Locate the `create` method and within it, return an inertia render for the 'Model/Create' page/component.

```php
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Feature/Create');
    }
```

---

## Storing

-   What does the `store` method do?
    -   It is dependent on the `create` method and receives data from the form that it renders.
    -   It takes data passed in the request and stores that in the database.
-   In order to be able to actually store the data in the database, you need to modify the Feature model and add a field:

```php
    protected $fillable = ['name', 'description', 'user_id'];
```

```php
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => ['required', 'string'],
            "description" => ['nullable', 'string'],
        ]);

        $data['user_id'] = auth()->id();

        Feature::create($data);

        return to_route('feature.index')->with('success', 'Feature created successfully');
    }
```
