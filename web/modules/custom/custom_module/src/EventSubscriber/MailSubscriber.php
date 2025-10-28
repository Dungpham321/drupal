<?php

namespace Drupal\custom_module\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\Core\Mail\MailAlterEvent;

/**
 * Thay thế hook_mail_alter() cho Drupal 11 (stable).
 */
class MailSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      'drupal.mail_alter' => 'onMailAlter',
    ];
  }

  /**
   * Xử lý khi mail được alter.
   */
  public function onMailAlter(MailAlterEvent $event): void {
    $message = &$event->getMessage();

    // Ghi log để debug.
    \Drupal::logger('custom_mail')->notice('📬 Mail alter triggered: <pre>@message</pre>', [
      '@message' => print_r($message, TRUE),
    ]);

    // Kiểm tra ID mail — in ra log trước để xem giá trị thật.
    if (!empty($message['id']) && str_contains($message['id'], 'ung_tuyen')) {

      // Đặt lại tiêu đề
      $message['subject'] = '📩 Ứng tuyển mới từ website';

      // Tạo nội dung HTML
      $body = [];
      $body[] = '<h2 style="color:#2563eb;">Thông tin ứng viên</h2>';

      if (!empty($message['params'])) {
        foreach ($message['params'] as $key => $value) {
          if (is_scalar($value)) {
            $body[] = "<p><strong>$key:</strong> " . htmlspecialchars((string) $value) . "</p>";
          }
        }
      }

      $body[] = '<hr><p>Được gửi từ website: ' . \Drupal::request()->getHost() . '</p>';

      // Gửi mail HTML
      $message['body'] = $body;
      $message['headers']['Content-Type'] = 'text/html; charset=UTF-8';

      \Drupal::logger('custom_mail')->notice('✅ Mail HTML đã được thay đổi.');
    }
  }

}
