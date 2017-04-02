(function() {
    var model = {
        currentCat: 'Tabby',
        adminFormFlag: false,
        cats: [{
            clickCount: 0,
            name: 'Tabby',
            imgSrc: 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'
        }, {
            clickCount: 0,
            name: 'Tiger',
            imgSrc: 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904'
        }, {
            clickCount: 0,
            name: 'Scaredy',
            imgSrc: 'img/22252709_010df3379e_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709'
        }, {
            clickCount: 0,
            name: 'Shadow',
            imgSrc: 'img/1413379559_412a540d29_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559'
        }, {
            clickCount: 0,
            name: 'Sleepy',
            imgSrc: 'img/9648464288_2516b35537_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288'
        }]
    }

    var controller = {
        setCatNameClick: function(name, click) {
            for (let i = 0; i < model.cats.length; i++) {
                if (model.cats[i].name == controller.getCurrentCat()) {
                    model.cats[i].name = name;
                    console.log(model.cats[i].name)
                    model.cats[i].clickCount = click;
                    controller.setCurrentCat(name);
                }
                //console.log (model.cats[i])
            }




        },
        // setCatClick: function(click) {
        //     model.cats.map(function(x) {

        //         if (x.name == controller.getCurrentCat()) {
        //             console.log(x,click)

        //                                 x.clickCount = click;
        //                             }
        //     })
        // },

        getAdminFormFlag: function() {
            return model.adminFormFlag;
        },
        setAdminFormFlag: function() {
            if (model.adminFormFlag) { model.adminFormFlag = false; } else { model.adminFormFlag = true; }
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        setCurrentCat: function(name) {
            model.currentCat = name;
        },
        getCats: function() {
            //console.log(model.cats);
            return model.cats;
        },
        getCat: function(name) {
            return model.cats.filter(function(x) {
                if (x.name == name) {
                    //console.log(x,name)
                    return true;
                }

            })
        },
        addCount: function() {
            model.cats.map(function(x) {
                    //console.log(x.name,controller.currentCat)
                    if (x.name == controller.getCurrentCat()) {
                        // console.log(x.currentCat,x.clickCount)
                        x.clickCount++;
                    }
                })
                // console.log(this.currentCat,controller.getCat('cat1'))

        },

        init: function() {
            viewCatList.render();
            viewCatDetail.init();


        }

    }
    var viewCatList = {
        init: function() {

        },
        render: function() {
            document.getElementById('catList').innerHTML = '';
            //controller.setAdminFormFlag();

            // console.log(controller.getCats());
            controller.getCats().map(function(x) {
                Li = document.createElement('LI');
                Li.innerHTML = x.name;
                Li.addEventListener('click', function() {

                    controller.setCurrentCat(x.name);
                    viewCatDetail.render();
                })

                Li.className = "list-group-item btn btn-block btn-primary";
                document.getElementById('catList').appendChild(Li);
            })

        }

    }
    var viewCatDetail = {
        init: function() {
            // document.getElementById('catName').innerHTML = 'cat1';
            // document.getElementById('catImage').src = 'images/cat1.jpg';
            // document.getElementById('catClicks').innerHTML = '0';
            controller.setCurrentCat('Tabby');
            viewCatDetail.render(controller.getCurrentCat());
            document.getElementById('catImage').addEventListener('click', function() {
                controller.addCount();
                viewCatDetail.render();

            });
            document.getElementById('admin').addEventListener('click', function() {
                if (!controller.getAdminFormFlag()) {
                    document.getElementById('form').style.display = 'block';
                    console.log('true')
                    controller.setAdminFormFlag();
                } else {
                    console.log('false')
                    document.getElementById('form').style.display = 'none';
                    controller.setAdminFormFlag();
                }
            });

            document.getElementById('Submit').addEventListener('click', function(event) {
                event.stopPropagation();
                controller.setCatNameClick(document.getElementById('name').value, document.getElementById('clicks').value);
                console.log(model.cats[0])
                controller.setAdminFormFlag();

                viewCatList.render()
                viewCatDetail.render();


                //controller.setCatClick();


            })




        },

        render: function() {
            var name = document.getElementById('catName');
            var img = document.getElementById('catImage');
            var count = document.getElementById('catClicks');
            name.innerHTML = controller.getCurrentCat();
            img.src = controller.getCat(controller.getCurrentCat())[0].imgSrc;
            // console.log(controller.getCat(controller.getCurrentCat())[0].clickCount);
            count.innerHTML = '       '+'<i class="fa fa-thumbs-up"></i>'+'    '+controller.getCat(controller.getCurrentCat())[0].clickCount ;
            //document.getElementById('admin').style.display='none';
            document.getElementById('form').style.display = 'none';

            //console.log(x,controller.getCat(x))



        }

    }

    controller.init();
})()
