import { ajax } from 'discourse/lib/ajax';
import favorites from 'discourse/plugins/discourse-favorites/lib/favorites';

export default {

  isAdmin: "",

  setupComponent(args, component) {
    component.set('category', args.category);
    component.set('isAdmin', this.currentUser.admin)
    favorites.isFavorite(args.category.id, isFavorite => {
      component.set('isFavorite', isFavorite);
      if (isFavorite) {
        Ember.$('tr[data-category-id="'+ args.category.id +'"]').addClass('green');
      } else {
        Ember.$('tr[data-category-id="'+ args.category.id +'"]').removeClass('green');
      }
    });
  },

  actions: {
    toggleFavorite: function () {
      if (this.currentUser.admin ) {
        const category_id = this.get('category').id;
        const status = !this.get('isFavorite');
        this.set('isFavorite', status);

        if (status) {
          Ember.$('tr[data-category-id="'+ category_id +'"]').addClass('green');
          favorites.add(category_id);
        } else {
          Ember.$('tr[data-category-id="'+ category_id +'"]').removeClass('green');
          favorites.remove(category_id);
        }
      }
    }
  }

};
