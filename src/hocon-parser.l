unstring		([a-zA-Z][a-zA-Z0-9]+)
key				([a-zA-Z][a-zA-Z0-9 ]+)
number			[0-9]+("."[0-9]+)?\b

%%
\n						return 'NEWLINE';
\s+						/* skip whitespace */
"//".*\n				/* skip comments */

\"(?:'\\'[\\"bfnrt/]|'\\u'[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*\"    yytext = yytext.substr(1,yyleng-2); return 'STRING'

":"						return ':';
"="						return '=';
"["						return '[';
"]"						return ']';
"{"						return '{';
"}"						return '}';
","						return ',';
"true"					return 'TRUE';
"false"					return 'FALSE';
"null"					return 'NULL';
{unstring}				return 'UNSTRING';
{key}					return 'KEY';
{number}				return 'NUMBER';
<<EOF>>					return 'EOF';

%%

