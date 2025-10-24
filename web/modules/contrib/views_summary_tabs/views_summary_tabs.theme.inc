<?php

/**
 * @file
 * Provides views data for the views_summary_tabs module.
 */

function template_preprocess_views_view_summary_tabs(&$variables) {
  // Use the default processing to add summary markup.
  template_preprocess_views_view_summary($variables);

  // If the Olivero theme is being used, attach the library to style tabs.
  $theme = \Drupal::theme()->getActiveTheme()->getName();
  if ($theme == 'olivero') {
    $variables['#attached']['library'][] = 'olivero/tabs';
  }

  // Verify that there is an active tab.
  $active_row = NULL;
  foreach ($variables['rows'] as $row_index => $row) {
    if ($row && property_exists($row, 'active') && $row->active) {
      $active_row = $row_index;
      break;
    }
  }
  // @todo retrieve parent default value and determine the tab to set active.
  // No active tab, so the first one to active.
  // @todo make this behaviour confgurable.
  if ($active_row === NULL) {
    if (!empty($variables['rows'][0]) && property_exists($variables['rows'][0], 'active')) {
      $variables['rows'][0]->active = TRUE;
    }
  }
}
