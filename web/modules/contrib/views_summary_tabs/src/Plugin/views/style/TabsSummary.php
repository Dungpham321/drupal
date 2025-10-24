<?php

namespace Drupal\views_summary_tabs\Plugin\views\style;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\style\DefaultSummary;

/**
 * The default style plugin for summaries.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "tabs_summary",
 *   title = @Translation("Tabs"),
 *   help = @Translation("Displays the summary as a set of tabs."),
 *   theme = "views_view_summary_tabs",
 *   display_types = {"summary"}
 * )
 */
class TabsSummary extends DefaultSummary {

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['classes'] = ['default' => 'tabs tabs--primary'];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
    $form['classes'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Classes'),
      '#default_value' => $this->options['classes'],
    ];
  }

}
