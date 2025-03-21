FROM php:8.1-apache
COPY . /var/www/html/
EXPOSE 4747
# Para mapear a porta 4747 na máquina host com a porta 80 do container, use:
# docker run -d -p 4747:80 seu-container
CMD ["apache2-foreground"]
