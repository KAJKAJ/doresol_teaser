/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

function send_mail_through_mandrill(recipient_email) {
	var mandrill = require('mandrill-api/mandrill');
	var mandrill_client = new mandrill.Mandrill('I_zJ7Wc4xJwYqRjx_REiZg');
	var template_name = "sign-up-confirmation-for-doresol-1";
	var template_content = [{
		"name": "sign-up-confirmation-for-doresol-1",
		"content": "Signup Confirmation"
	}];
	var message = {
		"html": "<p>도래솔에 관심 고객으로 등록되셨습니다.</p>",
		"text": "도래솔에 관심고객으로 등록되셨습니다.",
		"subject": "도래솔에 관심 고객으로 등록되셨습니다.",
		"from_email": "doresol@hummingtop.co.kr",
		"from_name": "Doresol",
		"to": [{
						"email": recipient_email,
						"name":  recipient_email,
						"type": "to"
				}],
		"headers": {
				"Reply-To": "doresol@hummingtop.co.kr"
		},
		"important": false,
		"track_opens": null,
		"track_clicks": null,
		"auto_text": null,
		"auto_html": null,
		"inline_css": null,
		"url_strip_qs": null,
		"preserve_recipients": null,
		"view_content_link": null,
		"bcc_address": "doresol@hummingtop.co.kr",
		"tracking_domain": null,
		"signing_domain": null,
		"return_path_domain": null,
		"merge": true,
		"global_merge_vars": [{
						"name": "merge1",
						"content": "merge1 content"
				}],
		"merge_vars": [{
						"rcpt": recipient_email,
						"vars": [{
										"name": "merge2",
										"content": "merge2 content"
								}]
				}],
		"tags": [
				"signup-confirmation"
		],
		"google_analytics_domains": [
				"doresol.net"
		],
		"google_analytics_campaign": "doresol@hummingtop.co.kr",
		"metadata": {
				"website": "www.doresol.net"
		},
	};
	var async = false;
	var ip_pool = "Main Pool";
	mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
						console.log(result);
		/*
		[{
						"email": "recipient.email@example.com",
						"status": "sent",
						"reject_reason": "hard-bounce",
						"_id": "abc123abc123abc123abc123abc123"
				}]
		*/
	}, function(e) {
		// Mandrill returns the error as an object with name and message keys
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
};

module.exports = {
  adapter: 'mysqlLocal',	
  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    emailAddress: {
      type: 'email', // Email type will get validated by the ORM
      required: true,
      unique: true,
    }
  },
	afterCreate: function(value, next) {
		console.log("afterCreate called");
		send_mail_through_mandrill(value.emailAddress);
		next();
	}
};
