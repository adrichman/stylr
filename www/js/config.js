angular.module('app')

.constant('ENV',
  {
    'categories':  
                              { 
                                1:  { "db": "Top"         , "friendly" : "Tops"          },
                                2:  { "db": "Bottom"      , "friendly" : "Bottoms"       },
                                3:  { "db": "Dress"       , "friendly" : "Dresses"       },
                                4:  { "db": "Accessory"   , "friendly" : "Accessories"   },
                                5:  { "db": "Bracelet"    , "friendly" : "Bracelets"     },
                                6:  { "db": "Necklace"    , "friendly" : "Necklaces"     }
                              },

    'loadingOptions':        
                              {
                                animation: 'fade-in',
                                showBackdrop: true,
                                maxWidth: 300,
                                showDelay: 200
                              },
    'stateChangeWhiteList':  
                              { 
                                // for keys, remove '.'
                                homeslide : true
                              },

    'loadingCopy': 
                              {
                                0:
                                    '',
                                1:  
                                    'Fetching Fresh Fashions',
                                2:  
                                    'Pulling Pretty Party Pieces',
                                3:  
                                    'Calcuating Crazy Coolness',
                                4:  
                                    'Grabbing Something Glam and Gorgeous',
                                5:  
                                    'Magically Making Millions of Miniature Measurements',
                                6:
                                    'Getting the Goods from our Garment Guru' 
                              },
    'style':
                              {
                                color:  false // hot/not text true: colors, false: white
                              },

    'levelPopupTitle':
                              {
                                1:  
                                    'Looking Good!',
                                2:  
                                    'We Like Your Style.',
                                3:  
                                    'You\'ve Chosen Wisely!',
                                4:  
                                    'Her Excellency, The Royal Hottness.',
                                5:  
                                    'Beautiful!<br>(You, That is.)',
                                6:
                                    'One Last Time!' 
                              }
  }
);