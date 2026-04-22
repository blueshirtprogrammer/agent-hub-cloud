<?php
/**
 * Plugin Name: FOUNDRYOS Launcher
 * Plugin URI: https://foundryos.ai
 * Description: Embed the FOUNDRYOS AI company launcher, founder intake, templates, and deal-room entry points into WordPress.
 * Version: 0.1.0
 * Author: FOUNDRYOS
 * License: GPL-2.0-or-later
 * Text Domain: foundryos-launcher
 */

if (!defined('ABSPATH')) {
    exit;
}

const FOUNDRYOS_LAUNCHER_VERSION = '0.1.0';
const FOUNDRYOS_LAUNCHER_OPTION = 'foundryos_launcher_settings';

function foundryos_launcher_default_settings() {
    return [
        'api_endpoint' => 'https://example.com',
        'licence_key' => '',
        'agency_name' => '',
        'affiliate_id' => '',
        'default_template' => 'enterprise-hospitality-ai',
        'white_label_mode' => '0',
    ];
}

function foundryos_launcher_get_settings() {
    return wp_parse_args(get_option(FOUNDRYOS_LAUNCHER_OPTION, []), foundryos_launcher_default_settings());
}

function foundryos_launcher_admin_menu() {
    add_options_page(
        'FOUNDRYOS Launcher',
        'FOUNDRYOS Launcher',
        'manage_options',
        'foundryos-launcher',
        'foundryos_launcher_settings_page'
    );
}
add_action('admin_menu', 'foundryos_launcher_admin_menu');

function foundryos_launcher_register_settings() {
    register_setting('foundryos_launcher_settings_group', FOUNDRYOS_LAUNCHER_OPTION, [
        'type' => 'array',
        'sanitize_callback' => 'foundryos_launcher_sanitize_settings',
        'default' => foundryos_launcher_default_settings(),
    ]);
}
add_action('admin_init', 'foundryos_launcher_register_settings');

function foundryos_launcher_sanitize_settings($input) {
    return [
        'api_endpoint' => esc_url_raw($input['api_endpoint'] ?? ''),
        'licence_key' => sanitize_text_field($input['licence_key'] ?? ''),
        'agency_name' => sanitize_text_field($input['agency_name'] ?? ''),
        'affiliate_id' => sanitize_text_field($input['affiliate_id'] ?? ''),
        'default_template' => sanitize_text_field($input['default_template'] ?? 'enterprise-hospitality-ai'),
        'white_label_mode' => !empty($input['white_label_mode']) ? '1' : '0',
    ];
}

function foundryos_launcher_settings_page() {
    $settings = foundryos_launcher_get_settings();
    ?>
    <div class="wrap">
        <h1>FOUNDRYOS Launcher</h1>
        <p>Connect your FOUNDRYOS licence and embed the AI company launcher into this WordPress site.</p>
        <form method="post" action="options.php">
            <?php settings_fields('foundryos_launcher_settings_group'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="foundryos_api_endpoint">FOUNDRYOS API endpoint</label></th>
                    <td><input id="foundryos_api_endpoint" name="<?php echo esc_attr(FOUNDRYOS_LAUNCHER_OPTION); ?>[api_endpoint]" type="url" class="regular-text" value="<?php echo esc_attr($settings['api_endpoint']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="foundryos_licence_key">Licence key</label></th>
                    <td><input id="foundryos_licence_key" name="<?php echo esc_attr(FOUNDRYOS_LAUNCHER_OPTION); ?>[licence_key]" type="password" class="regular-text" value="<?php echo esc_attr($settings['licence_key']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="foundryos_agency_name">Agency name</label></th>
                    <td><input id="foundryos_agency_name" name="<?php echo esc_attr(FOUNDRYOS_LAUNCHER_OPTION); ?>[agency_name]" type="text" class="regular-text" value="<?php echo esc_attr($settings['agency_name']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="foundryos_affiliate_id">Affiliate ID</label></th>
                    <td><input id="foundryos_affiliate_id" name="<?php echo esc_attr(FOUNDRYOS_LAUNCHER_OPTION); ?>[affiliate_id]" type="text" class="regular-text" value="<?php echo esc_attr($settings['affiliate_id']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="foundryos_default_template">Default template</label></th>
                    <td><input id="foundryos_default_template" name="<?php echo esc_attr(FOUNDRYOS_LAUNCHER_OPTION); ?>[default_template]" type="text" class="regular-text" value="<?php echo esc_attr($settings['default_template']); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row">White-label mode</th>
                    <td><label><input name="<?php echo esc_attr(FOUNDRYOS_LAUNCHER_OPTION); ?>[white_label_mode]" type="checkbox" value="1" <?php checked($settings['white_label_mode'], '1'); ?> /> Enable agency white-label mode</label></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        <h2>Shortcodes</h2>
        <code>[foundryos_launcher]</code><br />
        <code>[foundryos_founder_intake]</code><br />
        <code>[foundryos_deal_room]</code>
    </div>
    <?php
}

function foundryos_launcher_iframe($path = '/') {
    $settings = foundryos_launcher_get_settings();
    $endpoint = rtrim($settings['api_endpoint'], '/');
    if (empty($endpoint) || $endpoint === 'https://example.com') {
        return '<div class="foundryos-launcher-placeholder">Configure your FOUNDRYOS API endpoint in Settings → FOUNDRYOS Launcher.</div>';
    }
    $query = http_build_query([
        'template' => $settings['default_template'],
        'affiliate' => $settings['affiliate_id'],
        'agency' => $settings['agency_name'],
    ]);
    $src = esc_url($endpoint . $path . '?' . $query);
    return '<iframe title="FOUNDRYOS Launcher" src="' . $src . '" style="width:100%;min-height:760px;border:0;border-radius:16px;overflow:hidden"></iframe>';
}

function foundryos_launcher_shortcode() {
    return foundryos_launcher_iframe('/');
}
add_shortcode('foundryos_launcher', 'foundryos_launcher_shortcode');

function foundryos_founder_intake_shortcode() {
    return foundryos_launcher_iframe('/deal-room');
}
add_shortcode('foundryos_founder_intake', 'foundryos_founder_intake_shortcode');

function foundryos_deal_room_shortcode() {
    return foundryos_launcher_iframe('/deal-room');
}
add_shortcode('foundryos_deal_room', 'foundryos_deal_room_shortcode');
