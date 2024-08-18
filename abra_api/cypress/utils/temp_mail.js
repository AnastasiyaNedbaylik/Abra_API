const axios = require('axios');
const cheerio = require('cheerio');
const { mailinator_config } = require('../utilities/settings').default;

module.exports = (on, config) => {
  on('task', {
    async createTemporaryEmail() {
      try {
        const randomSuffix = Math.random().toString(36).substring(2, 15);
        const emailAddress = `${randomSuffix}@${mailinator_config.domain}`;
        return emailAddress;
      } catch (error) {
        console.error('Error creating temporary email:', error.message);
        throw new Error('Failed to create temporary email');
      }
    },

    async waitForEmail({ emailAddress, timeout = 60000, pollInterval = 5000 }) {
      if (!emailAddress) {
        throw new Error('Email address is not defined.');
      }

      const inbox = emailAddress.split('@')[0];
      const startTime = Date.now();

      while (Date.now() - startTime < timeout) {
        await new Promise(res => setTimeout(res, pollInterval));

        try {
          const response = await axios.get(`https://mailinator.com/api/v2/domains/private/inboxes/${inbox}?limit=1&sort=descending`, {
            headers: {
              'Authorization': `Bearer ${mailinator_config.apiToken}`
            }
          });

          if (response.status === 200 && response.data && response.data.msgs && response.data.msgs.length > 0) {
            const emailList = response.data.msgs;
            const latestEmailId = emailList[0].id;
            const emailDetailsResponse = await axios.get(`https://mailinator.com/api/v2/domains/private/inboxes/${inbox}/messages/${latestEmailId}`, {
              headers: {
                'Authorization': `Bearer ${mailinator_config.apiToken}`
              }
            });
            return emailDetailsResponse.data;
          }
        } catch (error) {
          console.error('Error retrieving email list:', error.message);
        }
      }

      throw new Error('Email was not received in time');
    },

    async parseRegistrationLink(emailDetails) {
      if (!emailDetails || !emailDetails.parts || emailDetails.parts.length === 0) {
        throw new Error('No email parts found');
      }

      const htmlPart = emailDetails.parts.find(part => part.headers['content-type'] && part.headers['content-type'].includes('text/html'));

      if (htmlPart) {
        const $ = cheerio.load(htmlPart.body);
        const registrationLink = $('a').attr('href');
        if (registrationLink) {
          return registrationLink;
        } else {
          throw new Error('Registration link was not found in the email HTML');
        }
      } else {
        throw new Error('No HTML part found in the email');
      }
    }
  });
};
