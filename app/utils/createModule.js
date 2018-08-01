import Vue from 'vue';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Observable } from 'rxjs';

export default function createModule(Component, loaders) {
  if (!Array.isArray(loaders)) {
    loaders = [loaders];
  }

  return Vue.component(`loader-${Component.name || 'Component'}`, {
    data: () => ({
      isLoaded: false,
    }),
    mounted() {
      Observable.from(loaders)
        .map(loader => loader(this.$store))
        .mergeAll()
        .subscribe(() => (this.isLoaded = true));
    },

    render(h) {
      return this.isLoaded ? (
        <ErrorBoundary>
          <Component {...this.$props} />
        </ErrorBoundary>
      ) : null;
    },
  });
}
