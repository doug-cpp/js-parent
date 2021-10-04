# js-parent

This is a set of functions for getting javascript object data. The motivation for creating this recursive series rised from the hard work around the reading from a deep target node setted into an erratic page payload object.

Take a dummy component named MYCOMP whose data needs to be readed into a function. This component is embedded in a page, whose many other sibling and nested ones changes its location according to dragging or manual layout editing. Thus, MYCOMP before setted in items.bodyData.blocks[4].componentBody.MYCOMP could now be into items.another.node[2].into.some.deep[122]. ].place.MYCMP.

The six functions below were made to handle this issue:

- getPathByKey(obj, key)
- getPathByValue(obj, val)
- getParentsByKey(obj, key)
- getParentsByValue(obj, val)
- getFirstParentByKey(obj, key)
- getFirstParentByValue(obj, val)

There are functions returning the first matching item and also those that return all items that match the second param criteria. When the function fetches all at once, it will return an array.

Note the many samples below, whose feedback log is self-explanatory:

```javascript
// Sample object:

const menu = {
  id: "abc123",
  value: 1234,
  exposed: {
    menuitem: [
      {value: "New", data: 'some'},
      {value: "Open", data: "great"},
      {value: "Close", data: "thing"},
      {value: "Help", items: {a: 1, b: 2, c: {deepest: 45}}}
    ]
  },
  popup: {
    menuitem: [
      {value: "Copy", data: 'some'},
      {value: "Cut", data: "other"},
      {value: "Paste", data: "thing"}
    ]
  }
};

// Function calls:

getPathByKey(menu, 'deepest');
/* returns:
exposed.menuitem[3].items.c.deepest
*/

getPathByValue(menu, 45);
/* returns:
exposed.menuitem[3].items.c.deepest
*/

getParentsByKey(menu, "menuitem");
/* returns:
[
  {
      "menuitem": Array(4)
  },
  {
      "menuitem": Array(3)
  }
]
*/

getParentsByValue(menu, "thing");
/* returns:
[
    {
        "value": "Close",
        "data": "thing"
    },
    {
        "value": "Paste",
        "data": "thing"
    }
]
*/

getParentsByKey(menu, "data");
/* returns:
[
    {
        "value": "New",
        "data": "some"
    },
    {
        "value": "Open",
        "data": "great"
    },
    {
        "value": "Close",
        "data": "thing"
    },
    {
        "value": "Copy",
        "data": "some"
    },
    {
        "value": "Cut",
        "data": "other"
    },
    {
        "value": "Paste",
        "data": "thing"
    }
]
*/

getFirstParentByKey(menu, "deepest");
/* returns:
{
    "deepest": 45
}
*/

getFirstParentByValue(menu, 45);
/* returns:
{
    "deepest": 45
}
*/
```

You can freely copy the single one function code you need. You can also create another ones to enrich the api or send changes that improve the performance or overall quality of the recursive algorithms.
