import { Pane } from 'https://cdn.skypack.dev/tweakpane';
import Splitting from 'https://cdn.skypack.dev/splitting';

const main = document.querySelector('main');

const Vara = {
  theme: 'system',
  debug: false,
  scrub: false,
  progress: 0 };


const ctrl = new Pane({
  title: 'Infinite',
  expanded: true });


let scrubber;
let progress;

const update = () => {
  document.documentElement.dataset.debug = Vara.debug;
  document.documentElement.dataset.theme = Vara.theme;
  document.documentElement.dataset.scrub = Vara.scrub;
  document.documentElement.style.setProperty('--progress', Vara.progress);
  if (scrubber) scrubber.hidden = !Vara.debug;
  if (progress) {
    progress.hidden = !Vara.debug;
    progress.disabled = !Vara.scrub;
  }
};

const sync = event => {
  if (
  !document.startViewTransition ||
  event.target.controller.view.labelElement.innerText !== 'Theme')

  return update();
  document.startViewTransition(() => update());
};


scrubber = ctrl.addBinding(Vara, 'scrub', {
  label: 'Scrub',
  hidden: true });


progress = ctrl.addBinding(Vara, 'progress', {
  min: 0,
  max: 100,
  step: 1,
  label: 'Progress',
  disabled: true });


ctrl.addBinding(Vara, 'theme', {
  label: 'Select',
  options: {
    Sahaja: 'light',
    Sahiti: 'dark' } });

ctrl.on('change', sync);
update();
Splitting();