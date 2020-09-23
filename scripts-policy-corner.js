fetch('./cockpit-next/api/collections/get/current_bills?token=account-9bfaf529a8b75b42cb4d23eaa0196a') // Call the fetch function passing the url of the API as a parameter
  .then(collection => collection.json())
  .then(function(data) {
    bills = data.entries.sort(function(a, b){
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    console.log(data);
    console.log(bills);
    for (bill of bills) {
      insertBill(bill);
    }
  })
  .catch(function(error) {
      // This is where you run code if the server returns any errors
      console.log(error);
  });

function insertBill(bill) {
    var bill_name = bill.name;
    var bill_link = bill.link;
    var bill_info = ", ".concat(bill.information);

    var bill_node_list_item = document.createElement('li');
    var bill_node = document.createElement('p');
    var bill_name_anchor = document.createElement('a');
    bill_name_anchor.innerText = bill_name;
    bill_name_anchor.href = bill_link;
    bill_name_anchor.target = "_blank";
    bill_node.appendChild(bill_name_anchor);
    bill_node.appendChild(document.createTextNode(bill_info));
    bill_node_list_item.appendChild(bill_node);

    document.getElementById("bills").appendChild(bill_node_list_item);
    // document.getElementById("bills").appendChild(document.createElement("br"));
    // document.getElementById("bills").appendChild(document.createElement("br"));
}