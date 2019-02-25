import { ajax } from 'discourse/lib/ajax';
import favorites from 'discourse/plugins/discourse-favorites/lib/favorites';

export default {

  setupComponent(args, component) {
    console.log($());
    console.log($().parent());

    console.log(this.$());
    console.log(this.$().parent());
    component.set('category', args.category);
    favorites.isFavorite(args.category.id, isFavorite => { component.set('isFavorite', isFavorite); });
  },

  actions: {
    toggleFavorite: function () {
      console.log($());
      console.log($().parent());
      const category_id = this.get('category').id;
      const status = !this.get('isFavorite');
      this.set('isFavorite', status);

      if (status) {
        favorites.add(category_id);
      } else {
        favorites.remove(category_id);
      }
    }
  }

};
