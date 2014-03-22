angular.module('app')

.constant('ENV',
  {
    'categories' :  
                  { 
                    "1":  { "db": "Top"         , "friendly" : "Tops"          },
                    "2":  { "db": "Bottom"      , "friendly" : "Bottoms"       },
                    "3":  { "db": "Dress"       , "friendly" : "Dresses"       },
                    "4":  { "db": "Accessory"   , "friendly" : "Accessories"   },
                    "5":  { "db": "Bracelet"    , "friendly" : "Bracelets"     },
                    "6":  { "db": "Necklace"    , "friendly" : "Necklaces"     }
                  }
  }
);