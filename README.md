# secretsanta

A "secretsanta" application for selecting an exclusive secret santa for each person in my family 
(restricted to use within my specific family).
A person's secretsanta cannot be the same as the person had last year (to make it more fun).

Some obv rules:
1. Cannot be your own secret santa
2. One secret santa per person
3. A person does not know who its secret santa is.

Notes for me to remember in the future:
compile:
elm make Main.elm --output index.html
mv index.html /var/www/html/index.html

Run service:
service in systemd (etc/systemd)
service secretsanta start|restart|stop
make sure that mysql is running.
