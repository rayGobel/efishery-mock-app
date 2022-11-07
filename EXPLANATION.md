# Design Rationale

## 1. Toolbar As Sort and Filter

I want something like a drawer of tools where user can do stuff with their data.
This is why I put all tools inside the `<Toolbar />` component. This will modify
on how the data is visualized.

On desktop application, we fully show the `<Toolbar />` because there are rooms
and it will be a hassle to put behind a Modal / overlays. This is not the case
on small screens because we want to focus on showing the data. Filters can came
after that

## 2. Product List

Gives a list of products to show on customer, with default `No Product(s)` where
there is no product given
