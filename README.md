# README

A basic React app using the Ant Design library to demonstrate filtering and sorting functionality in React.


In this project there are three main components: App, SortedTable, and Plant. The App component contains all the main
functionality of the project, and renders the main page, which includes the header, the main body, and the cart sidebar.
It also holds the data for the plant items that are displayed, as well as the data for which items are selected to filter
and sort the data. The SortedTable component takes the filteredItems, selectedGenus, and selectedFamily lists and sorts 
and filters the plant objects based on the user's selection before creating and displaying it in a grid. This grid consists 
of Plant components which do not contain functionality on their own other than displaying certain fields from the data 
JSON object that is passed in as a prop. The other important part of the Plant component is the button that allows it to
add or remove itself from the cart. A function is passed in, either addCartItem or removeCartItem, and that function is
called when the button is clicked on the plant card.

The user can trigger state changes by clicking the button to add or remove items from the cart. This will add or remove
the item from either the filteredItems list or the cartItems list depending on whether the item is already in the cart.
The user can also adjust the sorting of the list using a dropdown, and select genus or family values for plants to filter
items based on.
