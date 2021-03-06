package core.mail;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailSender {
	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(Mail mail) throws MessagingException {
		
		MimeMessage msg = mailSender.createMimeMessage();

		msg.setSubject(mail.getMailSubject());
		msg.setText(mail.getMailBody(), "utf-8", "html");
		msg.setRecipient(RecipientType.TO, new InternetAddress(mail.getMailRecipient()));
		
		mailSender.send(msg);
	}

}
