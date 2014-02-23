var WordChallenge = window.WordChallenge || {};
(function(S) {

    var ListCollections = [
        {
            title: 'Beginner\'s pack',
            description: 'This pack comes free with the app!',
            lists: [
            {
                id: 0,
                name: 'List 1',
                items: [
                    'A boy\'s name', 'Cities', 'Things that are cold', 'Things you don\'t want in the house', 'Sports teams', 'Insects', 'Things in a coffee bar', 'Things you mix up', 'TV shows', 'Things found in the ocean', 'Kinds of weather', 'Foods that kids hate'
                ]
            },
            {
                id: 1,
                name: 'List 2',
                items: [
                    'Famous females', 'Medicines/ drugs', 'Machines', 'Hobbies', 'Things you do in the morning', 'Things you plug in', 'Animals', 'Languages', 'Things you grab on your way out the door', 'Junk foods', 'Things that grow', 'Things in an arcade'
                ]
            },
            {
                id: 2,
                name: 'List 3',
                items: [
                    'Articles of clothing', 'Desserts', 'Car parts', 'Shoes', 'Athletes', '4-letter words', 'Things you fold', 'Things in a bedroom', 'Things you do online', 'Things at the beach', 'Things you dream about', 'Tools'
                ]
            },
            {
                id: 3,
                name: 'List 4',
                items: [
                    'Heroes', 'Gifts', 'Terms of endearment', 'Kinds of dances', 'Things that are black', 'Vehicles', 'Things found in an arena', 'Things people gossip about', 'Weekend activities', 'Things in a souvenir shop', 'Items in your purse/ wallet', 'World records'
                ]
            },
            {
                id: 4,
                name: 'List 5',
                items: [
                    'Sandwiches', 'Things you can do with your feet', 'World leaders/ politicians', 'School subjects', 'Excuses for being late', 'Types of ice cream', 'Things with balls', 'Television subjects', 'Things in a park', 'Countries', 'Stones/ gems', 'Musical instruments'
                ]
            },
            {
                id: 5,
                name: 'List 6',
                items: [
                    'Nicknames', 'Things in the sky', 'Things with windows', 'Universities', 'Fish', 'Things you add water to', 'Things that have spots', 'Things that smell bad', 'Things you\'re afraid of', 'Terms of measurement', 'Items in this room', 'Book titles'
                ]
            },
            {
                id: 6,
                name: 'List 7',
                items: [
                    'Fictional characters', 'Places to go on a date', 'Magazines', 'Famous landmarks', 'Sweet things', 'Things you save up to buy', 'Footwear', 'Something you keep hidden', 'Items in a suitcase', 'Things with tails', 'Sports equipment', 'Crimes'
                ]
            },
            {
                id: 7,
                name: 'List 8',
                items: [
                    'Things that are sticky', 'Awards/ ceremonies', 'Cars', 'Spices/ herbs', 'Bad habits', 'Cosmetics/ toiletries', 'Celebrities', 'Thing to do with leftover turkey', 'Reptiles/ amphibians', 'Fads', 'Leisure acitivities', 'Things you\'re allergic to'
                ]
            },
            {
                id: 8,
                name: 'List 9',
                items: [
                    'Restaurants', 'Notorious people', 'Fruits', 'Weapons', 'Toys', 'Household chores', 'Bodies of water', 'Authors', 'Halloween costumes', 'Funny movies', 'Things that are round', 'Things in pet stores'
                ]
            },
            {
                id: 9,
                name: 'List 10',
                items: [
                    'Types of sports', 'Song titles', 'Parts of the body', 'Spicy foods', 'Things you shout', 'Birds', 'A girl\'s name', 'Ways to get from here to there', 'Cooking ingredients', 'Villains/ monsters', 'Flowers', 'Things that weigh less than one pound'
                ]
            },
            {
                id: 10,
                name: 'List 11',
                items: [
                    'Things that need to be cleaned', 'Famous duos and trios', 'Things found in a desk', 'Island hot spots', 'Things at a hospital', 'Words associated with money', 'Items in a vending machine', 'Movie titles', 'Games', 'Things that you wear', 'Beers', 'Things at a circus'
                ]
            },
            {
                id: 11,
                name: 'List 12',
                items: [
                    'Vegetables', 'Things that make you scream', 'Things you throw away', 'Careers', 'Things you celebrate', 'Cartoon characters', 'Types of drinks', 'Musical groups', 'Science things', 'Things to do on a rainy day', 'Trees', 'Personality traits'
                ]
            },
            {
                id: 12,
                name: 'List 13',
                items: [
                    'Things you can tie in a knot', 'Things that are soft', 'Thing in a sci-fi movie', 'Word with four different vowels', 'Things that kids play with', 'Things at a wedding', 'Hot places', 'Things in outer space', 'Sounds', 'Things that are cute', 'Famous singers', 'Things at an amusement park'
                ]
            },
            {
                id: 13,
                name: 'List 14',
                items: [
                    'Things that are worn above the waist', 'Things that are bright', 'Things that have numbers', 'Things found in a gym/ health club', 'Chain stores', 'Ways to say hi and bye', 'Things in a garden', 'Things people use to decorate their houses', 'Items in an office', 'Things in pairs or sets', 'Artists', 'Cruise ship destinations'
                ]
            },
            {
                id: 14,
                name: 'List 15',
                items: [
                    'Things at a zoo', 'Things smaller than your fist', 'Things that fly', 'Things you eat on a diet', 'Worlds ending in "ly"', 'Things found under the table', 'Things in a hotel', 'Things you can do in less that 5 minutes', 'Things with claws', 'Party things', 'Reasons to skip school/ work', 'Titles people have'
                ]
            },
            {
                id: 15,
                name: 'List 16',
                items: [
                    'Things that go well with chocolate', 'Things in a mystery novel', 'Websites', 'Loud things', 'Things you eat with a spoon', 'Famous sayings', 'Underground things', 'Things that are wet', 'Things in an airport', 'Words with double letters', 'Things a baby uses', 'Things in fairy tales'
                ]
            }
        ]}
    ];

    S.Lists = {

        element_: null,    

        init: function(el) {
            
            _.bindAll(this, 'onListSelected_');

            var select = '<select id=\'list-selector\'>';
            for (var i=0; i < ListCollections[0].lists.length; i++) {
                var currentList = ListCollections[0].lists[i];
                select += '<option value="' + currentList.id + '">' + currentList.name + '</option>';
            }
            select += '</select>';

            el.html(select);
            this.element_ = $('#list-selector');
            this.element_.on('change', this.onListSelected_);
            this.onOptionSelected_($(this.element_.find('option')[0]));
        },

        onListSelected_: function(e) {
            var selectedOption = $(e.target.options[e.target.selectedIndex]);
            this.onOptionSelected_(selectedOption);
        },

        onOptionSelected_: function(selectedOption) {

            var selectedList = _.where(ListCollections[0].lists, {
                id: parseInt(selectedOption.val())
            });

            var orderedList = '<ol><li>';
            orderedList += selectedList[0].items.join('</li><li>');
            orderedList += '</li></ol>';
            $('.list').html(orderedList);

            if (window.myScroll) {
                window.myScroll.refresh();
            }

        }

    };

})(WordChallenge);

