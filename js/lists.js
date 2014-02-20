var Scattergories = window.Scattergories || {};
(function(S) {

    var lists = [
        {
            id: 0,
            name: 'List 1',
            items: [
                    "A boy's name",
                    "Toys",
                    "An animal",
                    "Things that are cold",
                    "Insects",
                    "TV Shows",
                    "Things that grow",
                    "Fruits",
                    "Things that are black",
                    "School subjects",
                    "Movie titles",
                    "Musical Instruments"
            ]
        },
        {
            id: 1,
            name: 'List 2',
            items: [
                "Authors","Bodies of water","A bird","Countries","Cartoon characters","Holidays","Things that are square","European city","Clothing","A relative","Games","Sports Stars"
            ]
        },
        {
            id: 2,
            name: 'List 3',
            items: [
                "School supplies","Things that are hot","Heroes","A girl's name","Fears","TV Stars","Colors","A fish","Fruits","Provinces or States","Sports equipment","Tools"
            ]
        },
        {
            id: 3,
            name: 'List 4',
            items: [
                "Breakfast foods","Gifts","Flowers","Ice cream flavors","A drink","A river","Cities","Things in the kitchen","Ocean things","Nicknames","Hobbies","Parts of the body"
            ]
        },
        {
            id: 4,
            name: 'List 5',
            items: [
                "Sandwiches","Items in a catalog","World leaders/Poloticians","School subjects","Excuses for being late","Ice cream flavors","Things that jump/bounce","Television stars","Things in a park","Foriegn cities","Stones/Gems","Musical instruments"
            ]
        },
        {
            id: 5,
            name: 'List 6',
            items: [
                "Nicknames","Things in the sky","Pizza toppings","Colleges/Universities","Fish","Countries","Things that have spots","Historical Figures","Something you're afraid oF","Terms of endearment","Items in this room","Drugs that are abused"
            ]
        },
        {
            id: 6,
            name: 'List 7',
            items: [
                "Fictional characters","Menu items","Magazines","Capitals","Kinds of candy","Items you save up to buy","Footware","Something you keep hidden","Items in a suitcase","Things with tails","Sports equiptment","Crimes"
            ]
        },
        {
            id: 7,
            name: 'List 8',
            items: [
                "Things that are sticky","Awards/ceremonies","Cars","Spices/Herbs","Bad habits","Cosmetics/Toiletries","Celebrities","Cooking utensils","Reptiles/Amphibians","Parks","Leisure activities","Things you're allergic to"
            ]
        },
        {
            id: 8,
            name: 'List 9',
            items: [
                "Restaurants","Notorious people","Fruits","Things in a medicine cabinet","Toys","Household chores","Bodies of water","Authors","Halloween costumes","Weapons","Things that are round","Words associated with exercise"
            ]
        },
        {
            id: 9,
            name: 'List 10',
            items: [
                "Sports","Song titles","Parts of the body","Ethnic foods","Things you shout","Birds","A girl's name","Ways to get from here to there","Items in a kitchen","Villains","Flowers","Things you replace"
            ]
        }
    ];

    S.Lists = {

        element_: null,    

        init: function(el) {
            
            _.bindAll(this, 'onListSelected_');

            var select = '<select id="list-selector"><option value="-1">-- Select list --</option>';

            for (var i=0; i<lists.length; i++) {
                var currentList = lists[i];
                select += '<option value="' + currentList.id + '">' + currentList.name + '</option>';
            }
            select += '</select>';

            el.html(select);
            this.element_ = $("#list-selector");
            this.element_.on('change', this.onListSelected_);
        },

        onListSelected_: function(e) {
            var selectedOption = $(e.target.options[e.target.selectedIndex]);
            var selectedList = _.where(lists, { id: parseInt(selectedOption.val()) });
            var orderedList = '<ol><li>';
            orderedList += selectedList[0].items.join('</li><li>'); 
            orderedList += "</li></ol>";
            $('.list').html(orderedList);
            window.myScroll.refresh();
        }

    };

})(Scattergories);

