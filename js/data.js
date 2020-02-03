let data = {
  items: [
    { id: 1, label: "First item" },
    {
      id: 2,
      label: "Second item",
      items: [
        { id: 3, label: "Sub Second item 1" },
        { id: 4, label: "Sub Second item 2" },
        {
          id: 5,
          label: "Sub Second item 3",
          items: [
            { id: 6, label: "Sub sub Second item 1" },
            { id: 7, label: "Sub sub Second item 2" }
          ]
        }
      ]
    },
    { id: 8, label: "Third item" },
    { id: 9, label: "Fourth item" }
  ]
};

export default data;
