/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

function send_mail_through_mandrill(recipient_email) {
	var currentTime = new Date();
	var mandrill = require('mandrill-api/mandrill');
	var mandrill_client = new mandrill.Mandrill('I_zJ7Wc4xJwYqRjx_REiZg');
	var template_name = "sign-up-confirmation-for-doresol-1";
	var template_content = [{
		"name": "sign-up-confirmation-for-doresol-1",
		"content": "이메일을 등록해주셔서 감사합니다."
	}];
	var message = {
		//"html": "<p>이메일을 등록해주셔서 감사합니다.</p>",
		//"text": "이메일을 등록해주셔서 감사합니다.",
		"subject": "이메일을 등록해주셔서 감사합니다.",
		"from_email": "doresol@hummingtop.co.kr",
		"from_name": "도래솔(Doresol)",
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
		"tags": [
				"signup-confirmation"
		],
		"google_analytics_domains": [
				"doresol.net",
				"doresol.co.kr"
		],
		"google_analytics_campaign": "youngmin@hummingtop.co.kr",
		"metadata": {
				"website": "www.doresol.net",
				"current_year": currentTime.getFullYear(),
				"current_month_day": currentTime.toDateString().substr(4,6),
				"company": "hummingtop",
				"email_addr": "doresol@hummingtop.co.kr",
				"description": "당신과 함께 하는 서비스"
		},
		"recipient_metadata": [
				{
				"rcpt": recipient_email,
				"values": {
					"user_id": recipient_email
					}
				}
			],
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
