/* eslint-disable prettier/prettier */
const { createError } = require('http-errors');
const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('../models/recipe');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recipes = [
  {
    recipeName: 'Tomato and Avocado Salad',
    difficulty: 'easy',
    TimeToCook: 10,
    ingredientsList: ['tomatoes', 'avocados', 'olive oil', 'salt', 'pepper'],
    Steps: [
      'Step 1: On a large plate or platter, arrange tomatoes and avocado. Drizzle with olive oil and season with salt and pepper.',
    ],
    videoLink: 'https://www.youtube.com/embed/SpI3QF_Iauc',
  },
  {
    recipeName: 'Baked sausages',
    difficulty: 'easy',
    TimeToCook: 10,
    ingredientsList: ['sausages', 'water', 'salt', 'pepper', 'garlic'],
    Steps: [
      'Step 1: Preheat oven to 350 degrees.',
      'Step 2: Place sausages into baking pan (13x9). Add water. Sprinkle with spices.',
      'Step 3: Bake uncovered for 20 minutes. Turn sausages over and return to oven for about 40 minutes more or until the sausages are a beautiful color ',
      'Step 4: Serve as you desire. ',
    ],
    videoLink: 'https://www.youtube.com/embed/8qWJNZBozvE',
  },
  {
    recipeName: 'Bacon chicken',
    difficulty: 'easy',
    TimeToCook: 45,
    ingredientsList: ['chicken', 'barbecue sauce', 'bacon'],
    Steps: [
      'Step 1: Preheat oven to 350 degrees F (175 degrees C)',
      'Step 2: Wash chicken and pat dry, then place in a 9x13 inch baking dish. Smother chicken with 1/2 of the barbecue sauce, then layer bacon slices cross-ways on top. Pour remaining 1/2 of barbecue sauce over all.',
      'Step 3: Bake at 350 degrees F (175 degrees C) for about 45 minutes or until chicken is cooked through and juices run clear. Serve one chicken breast per person with just the crispy, top pieces of bacon.',
    ],
    videoLink: 'https://www.youtube.com/embed/LmZNzj6iQCg',
  },
  {
    recipeName: 'Easy bake fish',
    difficulty: 'easy',
    TimeToCook: 35,
    ingredientsList: ['honey,', 'Dijon mustard', 'lemon', 'salmon', 'pepper'],
    Steps: [
      'Step 1: Preheat oven to 325 degrees F (165 degrees C).',
      'Step 2: In a small bowl, mix honey, mustard, and lemon juice. Spread the mixture over the salmon steaks. Season with pepper. Arrange in a medium baking dish.',
      'Step 3: Bake 20 minutes in the preheated oven, or until fish easily flakes with a fork.',
    ],
    videoLink: 'https://www.youtube.com/embed/tvnmY4ijcyI',
  },
  {
    recipeName: 'Smoked cheese ravioli',
    difficulty: 'easy',
    TimeToCook: 25,
    ingredientsList: ['raviolis', 'sour cream', 'Gouda cheese', 'parsley', 'pepper'],
    Steps: [
      'Step 1: Bring a large pot of lightly salted water to a rolling boil over high heat; stir in the frozen ravioli and return to a boil. Cook uncovered, stirring occasionally, until the ravioli float to the top and the filling is hot, 6 to 8 minutes. Drain.',
      'Meanwhile, bring the half-and-half to a simmer in a saucepan over medium heat. Whisk in the Gouda cheese until melted; season with parsley and white pepper. Pour the sauce over the cooked ravioli to serve.',
    ],
    videoLink: 'https://www.youtube.com/embed/0QmD4DOo5ko',
  },
  {
    recipeName: 'cheese omelette',
    difficulty: 'easy',
    TimeToCook: 10,
    ingredientsList: ['eggs', 'milk', 'butter', 'salt and pepper', 'Emmentaler cheese'],
    Steps: [
      'Step 1: Beat eggs in a bowl with a whisk. Add milk and season with salt and white pepper. Whisk for a few minutes until egg mixture is foamy; beating in air makes the omelette fluffy.',
      'Step 2: Melt butter in a small, nonstick skillet over medium-low heat. Pour in egg mixture and twirl skillet so bottom is evenly covered with egg. Cook for 1 minute until egg starts to set. Lift edges with a spatula and tilt the skillet so uncooked egg mixture can run towards the bottom of the skillet to set. Repeat until no visible liquid egg remains.',
      'Step 3: Carefully flip omelette and cook for another 30 seconds to 1 minute. Sprinkle Emmentaler cheese in one line in the middle of the omelette and fold omelette in half. Cook for 20 seconds, then slide omelette onto plate.',
    ],
    videoLink: 'https://www.youtube.com/embed/-ZnK6OgRqqY',
  },
  {
    recipeName: 'Spanish Gazpacho',
    difficulty: 'easy',
    TimeToCook: 20,
    ingredientsList: ['tomatoes', 'cucumber', 'peppers', 'salt and pepper', 'onions', 'garlic', 'olive oil', 'water'],
    Steps: [
      'Step 1: Combine tomatoes, cucumber, bell pepper, onion, vinegar, garlic, and salt in the bowl of a food processor; pulse until blended. Pour olive oil in slowly, with the processor running, until gazpacho is smooth. Add small amounts of cold water as needed to achieve desired consistency.',
      'Step 2: Combine tomatoes, cucumber, bell pepper, onion, vinegar, garlic, and salt in the bowl of a food processor; pulse until blended. Pour olive oil in slowly, with the processor running, until gazpacho is smooth. Add small amounts of cold water as needed to achieve desired consistency.',
    ],
    videoLink: 'https://www.youtube.com/embed/idOKFJN9wtQ',
  },
  {
    recipeName: 'pumpkin soup',
    difficulty: 'easy',
    TimeToCook: 40,
    ingredientsList: ['chicken broth', 'pumpkin', 'onions', 'salt and pepper', 'garlic', 'ginger', 'coconout milk'],
    Steps: [
      'Step 1: Heat chicken broth, pumpkin puree, onion, garlic, and Cajun seasoning to a boil in a saucepan over medium-high heat.',
      'Step 2: Reduce heat to low and simmer for 45 to 60 minutes, stirring every 15 minutes.',
      'Step 3: Reduce heat to low and simmer for 45 to 60 minutes, stirring every 15 minutes.',
    ],
    videoLink: 'https://www.youtube.com/embed/RPGBMkN-_Ys',
  },
  {
    recipeName: 'Easy Tuna Casserole',
    difficulty: 'easy',
    TimeToCook: 40,
    ingredientsList: ['macarroni', 'tuna', 'condensed cream', 'Cheddar cheese', 'onions'],
    Steps: [
      'Step 1:Preheat oven to 350 degrees F (175 degrees C).',
      'Step 2: In a 9x13-inch baking dish, combine the macaroni, tuna, and soup. Mix well, and then top with cheese.',
      'Step 3: Bake at 350 degrees F (175 degrees C) for about 25 minutes, or until bubbly. Sprinkle with fried onions, and bake for another 5 minutes. Serve hot.',
    ],
    videoLink: 'https://www.youtube.com/embed/9FhZOMSZDrU',
  },
  {
    recipeName: 'Sesame Seared Tuna',
    difficulty: 'easy',
    TimeToCook: 15,
    ingredientsList: [
      'soy sauce',
      'mirin',
      'honey',
      'sesame oil',
      'rice wine vinegar',
      'tuna',
      'sesame seeds',
      'olive oil',
    ],
    Steps: [
      'Step 1: In a small bowl, stir together the soy sauce, mirin, honey and sesame oil. Divide into two equal parts. Stir the rice vinegar into one part and set aside as a dipping sauce',
      'Step 2: Spread the sesame seeds out on a plate. Coat the tuna steaks with the remaining soy sauce mixture, then press into the sesame seeds to coat.',
      'Step 3: Heat olive oil in a cast iron skillet over high heat until very hot. Place steaks in the pan, and sear for about 30 seconds on each side. Serve with the dipping sauce and wasabi paste.',
    ],
    videoLink: 'https://www.youtube.com/embed/XTFVc4bESLY',
  },
  {
    recipeName: 'Roast Pork Loin Chop',
    difficulty: 'easy',
    TimeToCook: 120,
    ingredientsList: ['pork', 'onions', 'salt and pepper', 'garlic', 'water'],
    Steps: [
      'Step 1: Preheat oven to 350 degrees F (175 degrees C).',
      'Step 2: Place meat roasting rack in shallow baking dish or roasting pan. Place chops on rack. Salt and pepper to taste. Cover chops with onion slices. Pour water in bottom of pan, be sure it is not high enough to touch the chops. Cover with foil or tight lid and roast for one hour.',
      'Step 3: Cut into one chop to check for doneness. When chops are done all the way through, remove foil or lid and return to oven for 15 to 20 minutes to brown slightly. Watch carefully during browning.',
    ],
    videoLink: 'https://www.youtube.com/embed/6ybbclHqNhI',
  },
  {
    recipeName: 'Bacon, Egg, and Avocado Burgers',
    difficulty: 'easy',
    TimeToCook: 30,
    ingredientsList: [
      'burguer',
      'bacon',
      'onions',
      'salt and pepper',
      'Worcestire sauce',
      'cheddar cheese',
      'eggs',
      'lettuce',
      'avocados',
    ],
    Steps: [
      'Step 1: Preheat an outdoor grill for medium-high heat and lightly oil the grate. Butter each half of hamburger buns.',
      'Step 2: Place bacon in a heavy skillet and cook over medium-high heat, turning occasionally, until crisp, 10 to 12 minutes. Drain bacon slices on paper towels. Set the skillet aside, reserving grease.',
      'Step 3: Mix ground beef, Worcestershire sauce, and steak seasoning together in a large bowl; do not overmix. Form into 4 patties. Make a thumbprint in the middle of each patty to keep it from shrinking as it cooks.',
      'Step 4: Grill patties on the preheated grill until preferred doneness, about 6 minutes per side. An instant-read thermometer inserted into the center should read at least 160 degrees F (71 degrees C). Top each burger with 2 slices bacon and a Cheddar cheese slice; close the grill lid until cheese is melted, about 1 minute. Remove patties from the grill.',
      'Step 5: Place buns on the grill, buttered-side down, and cook until browned, about 1 minute. Remove from the grill. Place 1 patty on the bottom half of each bun.',
      'Step 6: Reheat the bacon grease in the skillet over medium-high heat. Crack eggs into the hot skillet and fry until whites are cooked but yolk is still runny, about 4 minutes. Immediately place 1 egg on top of each patty. Top with lettuce, onion, avocado, and remaining buns.',
    ],
    videoLink: 'https://www.youtube.com/embed/TQ2kdr-5MI0',
  },
  {
    recipeName: "Mom's Baked Macaroni and Cheese",
    difficulty: 'easy',
    TimeToCook: 40,
    ingredientsList: ['macarroni', 'Emmentaler cheese', 'milk', 'Cheddar cheese'],
    Steps: [
      'Step 1:Preheat oven to 350 degrees F (175 degrees C). Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.',

      'Step 2:Place macaroni in a 2 quart casserole dish. Stir in cheese soup and milk until well combined. Sprinkle with shredded Colby.',

      'Step 3: Bake 25 to 30 minutes, or until cheese is brown and bubbly.',
    ],
    videoLink: 'https://www.youtube.com/embed/DonJQk9_OBg',
  },
  {
    recipeName: 'Easy Spaghetti Squash Spaghetti',
    difficulty: 'easy',
    TimeToCook: 50,
    ingredientsList: ['spaguetti', 'parmesan cheese', 'olive oil', 'black pepper'],
    Steps: [
      'Step 1: Preheat oven to 350 degrees F (175 degrees C). Place the squash halves into a large baking dish with the cut-sides facing down.',
      'Step 2: Bake in the preheated oven until easily pierced with a knife, about 40 minutes. Cool squash for 10 minutes.',
      ' Step 3: Shred the inside of the squash with a fork and transfer to a bowl. Add olive oil, salt, and pepper to shredded squash and toss to coat. Serve with Parmesan cheese.',
    ],
    videoLink: 'https://www.youtube.com/embed/S5yw06NjwtQ',
  },
  {
    recipeName: 'Spaghetti carbonara',
    difficulty: 'easy',
    TimeToCook: 20,
    ingredientsList: ['spaguetti', 'parmesan cheese', 'olive oil', 'bacon', 'eggs', 'bacon'],
    Steps: [
      'Step 1: Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain',

      'Step 2:Meanwhile, place bacon in a large, deep skillet. Cook over medium high heat until evenly brown. Drain, reserving some of the drippings, crumble and set aside.',

      ' Step 3:Scramble eggs in bacon drippings.',

      'Step 4:Place spaghetti in a large bowl. Pour in olive oil, and mix well; use enough to just moisten spaghetti. Stir in bacon, eggs, and Parmesan cheese. Serve immediately.',
    ],
    videoLink: 'https://www.youtube.com/embed/5t7JLjr1FxQ',
  },
  {
    recipeName: 'Easy zuchinni',
    difficulty: 'easy',
    TimeToCook: 20,
    ingredientsList: ['zuchinni', 'vinegar', 'olive oil', 'black pepper', 'garlic'],
    Steps: [
      'Step 1:Season zucchini with salt and pepper and brush lightly with olive oil.',

      ' Step 2: Heat a grill pan over medium-high heat. Place zucchini slices, a few at a time, into hot pan and cook until the pattern of the pan is imprinted into zucchini, about 4 minutes. Turn and cook an additional 3 to 4 minutes.',
      'Step 3:Combine olive oil, vinegar, parsley, garlic, salt, and pepper in a small bowl. Brush cooked zucchini with olive oil mixture and serve.',
    ],
    videoLink: 'https://www.youtube.com/embed/VoRLdhtDzzI',
  },
  {
    recipeName: 'Sesam noodles',
    difficulty: 'easy',
    TimeToCook: 20,
    ingredientsList: [
      'noodles',
      'soja sauce',
      'rice vinegar',
      'black pepper',
      'garlic',
      'sesame oil',
      'sugar',
      'onions',
      'chili sauce',
    ],
    Steps: [
      'Step 1:Bring a pot of lightly salted water to boil. Add pasta, and cook until al dente, about 8 to 10 minutes. Drain, and transfer to a serving bowl.',
      'Step 2:Meanwhile, place a saucepan over medium-high heat. Stir in garlic, sugar, oil, vinegar, soy sauce, sesame oil, and chili sauce. Bring to a boil, stirring constantly, until sugar dissolves. Pour sauce over linguine, and toss to coat. Garnish with green onions and sesame seeds.',
    ],
    videoLink: 'https://www.youtube.com/embed/JUskq1OAJaE',
  },
  {
    recipeName: 'Peanut noodles',
    difficulty: 'easy',
    TimeToCook: 25,
    ingredientsList: [
      'noodles',
      'soja sauce',
      'rice vinegar',
      'black pepper',
      'garlic',
      'sesame oil',
      'sugar',
      'onions',
      'chili sauce',
      'peanut butter',
      'onions',
    ],
    Steps: [
      'Step 1:Cook pasta in a large pot of boiling water until done. Drain.',

      'Step 2:Meanwhile, combine oil and onions in a small skillet. Saute over low heat until tender. Add ginger; cook and stir for 1 to 2 minutes. Mix in peanut butter, soy sauce, water, vinegar, sugar, and red pepper flakes. Remove from heat.',

      'Step 3:Toss noodles with sauce, and serve.',
    ],
    videoLink: 'https://www.youtube.com/embed/JUskq1OAJaE',
  },
  {
    recipeName: 'Seabass barbecue',
    difficulty: 'easy',
    TimeToCook: 20,
    ingredientsList: ['seabass', 'olive oil', 'lemon juice', 'black pepper', 'garlic', 'bay leaf'],
    Steps: [
      'Step 1: Preheat an outdoor grill for medium heat and lightly oil grate.',

      'Step 2:In a small bowl, stir together lemon juice, olive oil, salt, pepper and bay leaf. Rub fish with mixture inside and out.',

      'Step 3:Grill the fish over medium heat for 8 to 10 minutes, flipping halfway through. Fish is done when it flakes easily with a fork.',
    ],
    videoLink: 'https://www.youtube.com/embed/sQFmyIBiKlQ',
  },
  {
    recipeName: 'Baked Sea Bass with Vegetables',
    difficulty: 'easy',
    TimeToCook: 35,
    ingredientsList: ['seabass', 'olive oil', 'oregano', 'black pepper', 'garlic', 'tomatoes', 'eggplant'],
    Steps: [
      'Step 1:Preheat the oven to 400 degrees F (200 degrees C). Line a baking dish with aluminum foil so that it hangs over the sides of the dish.',

      'Step 2:Combine olive oil, oregano, basil, salt, and pepper in a large mixing bowl. Add eggplant and diced tomatoes and stir to coat thoroughly with the oil mixture.',

      'Step 3: Place sea bass in the center of the prepared baking dish and arrange vegetables on either side of the fish, layering sliced tomatoes on top. Raise and fold aluminum foil edges so that the fish bakes in the vegetable juice.',

      'Step 4: Bake in the preheated oven until fish flakes easily with a fork and eggplant is tender, 35 to 40 minutes.',
    ],
    videoLink: 'https://www.youtube.com/embed/Or0HoAyFQ8g',
  },
  {
    recipeName: 'Monkfish provincial',
    difficulty: 'easy',
    TimeToCook: 25,
    ingredientsList: [
      'monkfish',
      'olive oil',
      'tomatoes',
      'black pepper',
      'garlic',
      'mushrooms',
      'white wine',
      'butter',
    ],
    Steps: [
      'Step 1:In a resealable plastic bag, mix the salt, pepper, Cajun seasoning, and flour. Place the monkfish in the bag, seal, and shake to lightly coat.',

      ' Step 2:Heat the oil and melt the butter in a skillet over medium heat. Place the monkfish in the skillet, and cook for about 3 minutes. Mix in the garlic, tomato, and mushrooms, and continue cooking 3 minutes. Mix in the wine and parsley. Continue to cook and stir 2 minutes, or until the monkfish flakes easily with a fork.',
    ],
    videoLink: 'https://www.youtube.com/embed/o4l7fgbpgVY',
  },
  {
    recipeName: 'Grilled Vegetables with Balsamic Vinegar',
    difficulty: 'easy',
    TimeToCook: 45,
    ingredientsList: [
      'eggplant',
      'olive oil',
      'zuchinnis',
      'black pepper',
      'garlic',
      'onions',
      'soy sauce',
      'balsamic vinegar',
      'peppers',
    ],
    Steps: [
      'Step 1:Whisk olive oil, soy sauce, balsamic vinegar, salt, and pepper in a large bowl. Toss eggplants, zucchinis, and bell peppers in soy sauce marinade. Marinate for about 45 minutes.',

      'Step 2:Preheat grill for medium heat and lightly oil the grate. Remove vegetables from marinade, shaking off excess.',

      'Step 3:Grill vegetables on preheated grill until tender, 10 to 15 minutes, brushing vegetables with marinade. Transfer cooked vegetables to a platter and serve with any remaining marinade.',
    ],
    videoLink: 'https://www.youtube.com/embed/7EBBDMSgz_s',
  },
  {
    recipeName: 'Lamb Shank',
    difficulty: 'easy',
    TimeToCook: 145,
    ingredientsList: ['lamb', 'olive oil', 'rosemary', 'black pepper', 'garlic', 'lemon juice', 'honey', 'basil'],
    Steps: [
      'Step 1:Cut slits into lamb shank in a criss-cross pattern about 1 inch apart and 1/2 inch deep; place into a shallow dish.',

      'Step 2:Whisk olive oil, rosemary, thyme, basil, parsley, mint, black pepper, salt, and cayenne pepper together in a bowl; brush evenly over the lamb shank. Refrigerate lamb at least 1 hour.',

      'Step 3:Preheat grill for medium heat and lightly oil the grate.',

      'Step 4:Stir lemon juice and honey together in a small bowl until smooth.',

      'Step 5:Cook lamb shank on preheated grill, basting every 15 minutes with the lemon juice mixture, until browned on the outside and red in the center, about 30 minutes per side. An instant-read thermometer inserted into the center should read 125 degrees F (52 degrees C).',
    ],
    videoLink: 'https://www.youtube.com/embed/dz-rA15Wkao',
  },
  {
    recipeName: 'Lamb Shank Braised in White Wine with Rosemary',
    difficulty: 'easy',
    TimeToCook: 215,
    ingredientsList: ['lamb', 'olive oil', 'white wine', 'black pepper', 'garlic', 'onions'],
    Steps: [
      'Step 1:In a large frying pan, heat oil over medium-high heat. Add shanks to hot pan, and brown all sides; this should take about 12 minutes. Transfer to a plate.',

      'Step 2: Reduce heat to medium-low, and add garlic to the pan; cook for 30 to 40 seconds. Stir in onion, and continue cooking until translucent, 6 to 8 minutes. Return shanks to the pan, and season with 2 teaspoons fresh rosemary and salt and pepper to taste. Pour in wine, raise heat to medium-high, and bring to a simmer. Reduce heat to low, cover tightly, and simmer until the shanks are very tender when pierced with a knife, 2 to 2 1/2 hours. Turn once or twice during cooking, and add water as necessary to maintain original level of liquid. Serve shanks garnished with rosemary sprigs.',
    ],
    videoLink: 'https://www.youtube.com/embed/t01Z5hp0Z9o',
  },
  {
    recipeName: 'Carrot rice',
    difficulty: 'easy',
    TimeToCook: 25,
    ingredientsList: [
      'rice',
      'olive oil',
      'carrots',
      'black pepper',
      'garlic',
      'onions',
      'butter',
      'peanuts',
      'cilantro',
    ],
    Steps: [
      'Step 1:Combine rice and water in a medium saucepan. Bring to a boil over high heat. Reduce heat to low, cover with lid, and allow to steam until tender, about 20 minutes.',
      'Step 2:While rice is cooking, grind peanuts in a blender and set aside. Heat the margarine in a skillet over medium heat. Stir in the onion; cook and stir until the onion has softened and turned golden brown about 10 minutes. Stir in ginger, carrots, and salt to taste. Reduce heat to low and cover to steam 5 minutes. Stir in cayenne pepper and peanuts. When rice is done, add it to skillet and stir gently to combine with other ingredients. Garnish with chopped cilantro.',
    ],
    videoLink: 'https://www.youtube.com/embed/mvaeLpbklsk',
  },
  {
    recipeName: 'Garlic quinoa',
    difficulty: 'easy',
    TimeToCook: 25,
    ingredientsList: ['quinoa', 'olive oil', 'butter', 'garlic', 'chiken broth'],
    Steps: [
      'Step 1:Melt butter in a saucepan over medium heat. Cook and stir garlic in melted butter until just browned, about 5 minutes.',

      'Step 2:Pour chicken broth into the saucepan; add quinoa and stir. Bring the mixture to a boil, reduce heat to low, cover, and simmer until liquid is absorbed, about 15 minutes.',

      'Step 3:Remove saucepan from heat and rest mixture 5 minutes before fluffing with a fork.',
    ],
    videoLink: 'https://www.youtube.com/embed/RPGBMkN-_Ys',
  },
  {
    recipeName: 'Garlic quinoa',
    difficulty: 'easy',
    TimeToCook: 25,
    ingredientsList: ['quinoa', 'olive oil', 'butter', 'garlic', 'chiken broth'],
    Steps: [
      'Step 1:Melt butter in a saucepan over medium heat. Cook and stir garlic in melted butter until just browned, about 5 minutes.',

      'Step 2:Pour chicken broth into the saucepan; add quinoa and stir. Bring the mixture to a boil, reduce heat to low, cover, and simmer until liquid is absorbed, about 15 minutes.',

      'Step 3:Remove saucepan from heat and rest mixture 5 minutes before fluffing with a fork.',
    ],
    videoLink: 'https://www.youtube.com/embed/NrCjnyzgVLw',
  },
];

Recipe.create(recipes)
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    createError(error);
  });

module.exports = Recipe;